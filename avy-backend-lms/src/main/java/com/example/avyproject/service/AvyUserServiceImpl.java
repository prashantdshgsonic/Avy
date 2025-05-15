package com.example.avyproject.service;

import com.example.avyproject.converter.AvyUserConverter;
import com.example.avyproject.converter.CourseConverter;
import com.example.avyproject.converter.EducationDtoConverter;
import com.example.avyproject.converter.WorkExperienceDtoConverter;
import com.example.avyproject.dto.*;
import com.example.avyproject.entity.*;
import com.example.avyproject.entity.embeddable.Asset;
import com.example.avyproject.entity.embeddable.Location;
import com.example.avyproject.enums.Degrees;
import com.example.avyproject.exceptions.AccountNotFoundException;
import com.example.avyproject.exceptions.AssetAlreadyExistsException;
import com.example.avyproject.exceptions.FileNotCVException;
import com.example.avyproject.exceptions.RoleNotFoundException;
import com.example.avyproject.repository.*;
import com.example.avyproject.service.utility.RestUtil;
import com.example.avyproject.service.utility.WebClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import org.webjars.NotFoundException;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class AvyUserServiceImpl implements AvyUserService {
    private final AvyUserRepository avyUserRepository;
    private final AvyUserConverter avyUserConverter;
    private final CourseProgressService courseProgressService;
    private final CourseService courseService;
    private final CourseConverter courseConverter;
    private final WorkExperienceDtoConverter workExperienceDtoConverter;
    private final ImageService imageService;
    private final PdfService pdfService;
    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final EducationRepository educationRepository;
    private final RestTemplate restTemplate;
    private final WebClient webClient;
    @PersistenceContext
    private final EntityManager entityManager;
    @Value("${register.voice.url}")
    private String registerVoiceServiceUrl;
    @Value("${request.navigation.url}")
    private String navigationRequestUrl;
    @Value("${validate.cv.url}")
    private String validateCVUrl;

    @Override
    public AvyUser getByLogin(String login) {
        return avyUserRepository.findByEmail(login)
                .orElseThrow(() -> new AccountNotFoundException("User with login " + login + " not found"));
    }

    @Override
    public AvyUser getEntityById(Long avyUserId) {
        return avyUserRepository.findById(avyUserId)
                .orElseThrow(() -> new AccountNotFoundException("User with login " + avyUserId + " not found"));
    }


    @Override
    public AvyUser registerUser(AvyUser avyUser) {
        return avyUserRepository.save(avyUser);
    }

    @Override
    public List<AvyUserDto> getUserByUsername(String name) {
        List<AvyUser> byFirstName = avyUserRepository.findByFirstName(name);
        return byFirstName.stream()
                .map(avyUserConverter::avyUserToAvyUserDto)
                .toList();
    }

    @Override
    public AvyUserDto createNewAvyUser(AvyUserCreateDto avyUserCreateDto) {
        Role userRole = roleRepository.findRoleByRoleName(avyUserCreateDto.getRoleName())
                .orElseThrow(() -> new RoleNotFoundException("Role not found"));
        AvyUser newUser = AvyUser.builder()
                .email(avyUserCreateDto.getEmail())
                .password(avyUserCreateDto.getPassword())
                .hasVoicePass(false)
                .firstName(avyUserCreateDto.getFirstName())
                .lastName(avyUserCreateDto.getLastName())
                .userName(avyUserCreateDto.getUsername())
                .roles(Set.of(userRole))
                .build();
        AvyUser save = avyUserRepository.save(newUser);
        //add all courses to user as recommended
        return getUserDtoByEmail(save.getEmail());
    }

    @Override
    public AvyUser updateAvyUser(AvyUserUpdateDto userUpdateDto) {
        AvyUser avyUser = getEntityById(userUpdateDto.getId());
        avyUser.setFirstName(userUpdateDto.getFirstName());
        avyUser.setLastName(userUpdateDto.getLastName());
        avyUser.setUserName(userUpdateDto.getUserName());
        if(avyUser.getLocation() == null) {
            avyUser.setLocation(new Location());
        }
        avyUser.getLocation().setState(userUpdateDto.getState());
        avyUser.getLocation().setCity(userUpdateDto.getCity());
        avyUser.getLocation().setCountry(userUpdateDto.getCountry());
        avyUser.setAvatarId(userUpdateDto.getAvatarId());
        avyUser.setUserJob(userUpdateDto.getUserJob());
        avyUser.setUserLinkedIn(userUpdateDto.getUserLinkedIn());
        return avyUserRepository.save(avyUser);
    }

    @Override
    @Transactional
    public void deleteById (Long userId){
        List<CourseProgress> allCourseProgressByUserId = courseProgressService.getAllCourseProgressByUserId(userId);
        courseProgressService.deleteListCourseProgress(allCourseProgressByUserId);
        avyUserRepository.deleteById(userId);
    }

    @Override
    public AvyUserDto getUserDtoByEmail(String email) {
//        AvyUser byLogin = getByLogin(email);
//        return avyUserConverter.avyUserToAvyUserDto(byLogin);
        AvyUser avyUser = avyUserRepository.findByEmail(email)
                .orElseThrow(() -> new AccountNotFoundException("User with login " + email + " not found"));
        return avyUserConverter.avyUserToAvyUserDto(avyUser);
    }

    @Override
    public AvyUserLightDto getAvyUserLightDtoByEmail(String email) {
        AvyUser avyUser = avyUserRepository.findByEmail(email)
                .orElseThrow(() -> new AccountNotFoundException("User with login " + email + " not found"));
        return avyUserConverter.avyUserToAvyUserLightDto(avyUser);
    }

    public AvyUser getUserByToken (String token){
        String login = jwtService.getUsernameFromToken(token);
        return getByLogin(login);
    }

    @Override
    public List<CourseDto> getCoursesInProgress (String email){
        Long userId = getUserIdByLogin(email);
        return courseProgressService.getCoursesInProgress(userId)
                .stream()
                .map(CourseProgress::getCourse)
                .map(courseConverter::courseToCourseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseDto> getCoursesCompleted (String email){
        Long userId = getUserIdByLogin(email);
        return courseProgressService.getCoursesCompleted(userId)
                .stream()
                .map(CourseProgress::getCourse)
                .map(courseConverter::courseToCourseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseDto> getCoursesRecommended (String email){
        Long userId = getUserIdByLogin(email);
        return courseProgressService.getCoursesRecommended(userId)
                .stream()
                .map(CourseProgress::getCourse)
                .map(courseConverter::courseToCourseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseDto> getAllCoursesByCreator (AvyUser avyUser){
        return courseService.getAllCoursesByCreator(avyUser)
                .stream()
                .map(courseConverter::courseToCourseDto)
                .collect(Collectors.toList());
    }


    private Long getUserIdByLogin(String email) {
        AvyUser avyUser = avyUserRepository.findByEmail(email)
                .orElseThrow(() -> new AccountNotFoundException("User with login " + email + " not found"));
        return avyUser.getId();
    }

    @Override
    public AvyUserDto updateAvyUserInfo (AvyUserUpdateDto avyUserUpdateDto,AvyUser avyUser){
        if (!Objects.equals(avyUser.getId(), avyUserUpdateDto.getId())){
            throw new AccountNotFoundException("Account with id "+avyUser.getId()+" trying to change different account info with id "+avyUserUpdateDto.getId());
        }
        return avyUserConverter.avyUserToAvyUserDto(updateAvyUser(avyUserUpdateDto));
    }

    @Override
    @Transactional
    public AvyUserDto updateAvyUserImage(MultipartFile file, AvyUser avyUser) {
        String pathToImage = imageService.uploadImage(file);
        try {
            avyUser.setLinkToImage(pathToImage);
            return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
        } catch (RuntimeException e) {
            imageService.deleteImage(pathToImage);
            throw e;
        }
    }

    @Override
    public List<AvyUser> getAllUsers() {
        return avyUserRepository.findAll();
    }

    @Override
    public AvyUser getById(Long userId) {
        return avyUserRepository.findById(userId)
                .orElseThrow(() -> new AccountNotFoundException("User with id " + userId + " not found"));
    }

    @Override
    public void registerVoicePass(Long id) {
        AvyUser avyUser = getById(id);
        Map<String, Long> map = new HashMap<>();
        map.put("user_id", avyUser.getId());
        try {
            WebClientUtil
                    .webClientSendPost(webClient, registerVoiceServiceUrl, map, String.class);
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw e;
        }
    }

    @Override
    public String requestNavigation() {
        try {
            Map answer = WebClientUtil
                    .webClientSendPost(webClient, navigationRequestUrl, "", Map.class);
            return (String) answer.get("answer");
        } catch (RuntimeException e) {
            log.error(e.getMessage());
            throw e;
        }
    }

    @Override
    @Transactional
    public AvyUserDto updateAvyUserEducationInfo(EducationDto educationDto, AvyUser avyUser) {
        Education education = EducationDtoConverter.convertDtoToEducation(educationDto);
        education.setAvyUser(avyUser);
        avyUser.getEducationHistory().add(education);
        return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
    }

    @Override
    @Transactional
    public AvyUserDto updateAvyUserWorkExperienceInfo(WorkExperienceDto workExperienceDto, AvyUser avyUser) {
        WorkExperience workExperience = workExperienceDtoConverter.convertDtoToWorkExperience(workExperienceDto);
        workExperience.setAvyUser(avyUser);
        avyUser.getWorkExperience().add(workExperience);
        return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
    }

    @Override
    @Transactional
    public AvyUserDto deleteAvyUserWorkExperienceInfo(Long id, AvyUser avyUser) {
        WorkExperience workExperience = workExperienceRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Work experience not found"));
        avyUser.getWorkExperience().remove(workExperience);
        return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
    }

    @Override
    @Transactional
    public AvyUserDto deleteAvyUserEducationInfo(Long id, AvyUser avyUser) {
        Education education = educationRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Education not found"));
        avyUser.getEducationHistory().remove(education);
        return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
    }

    @Override
    @Transactional
    public AvyUserDto editAvyUserWorkExperience(WorkExperienceDto workExperienceDto, AvyUser avyUser) {
        WorkExperience workExperience = workExperienceRepository.findById(workExperienceDto.getId()).orElseThrow(
                () -> new NotFoundException("Work experience not found"));
        workExperience.setCompanyTitle(workExperienceDto.getCompanyTitle());
        workExperience.setPosition(workExperienceDto.getPosition());
        workExperience.setDescription(workExperienceDto.getDescription());
        workExperience.setStartDate(workExperienceDto.getStartDate());
        workExperience.setEndDate(workExperienceDto.getEndDate());
        return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
    }

    @Override
    @Transactional
    public AvyUserDto editAvyUserEducation(EducationDto educationHistoryDto, AvyUser avyUser) {
        Education education = educationRepository.findById(educationHistoryDto.getId()).orElseThrow(
                () -> new NotFoundException("Education not found"));
        education.setInstitutionTitle(educationHistoryDto.getInstitutionTitle());
        education.setSpecialization(educationHistoryDto.getSpecialization());
        education.setDegree(Degrees.fromText(educationHistoryDto.getDegree()));
        education.setStartDate(educationHistoryDto.getStartDate());
        education.setEndDate(educationHistoryDto.getEndDate());
        return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
    }

    @Override
    @Transactional
    public AvyUserDto updateAvyUserCV(MultipartFile file, AvyUser avyUser) {
        String linkToCV = pdfService.uploadPdf(file);
        Map<String,String> map = Map.of("link_to_cv", linkToCV);
        Map answer = WebClientUtil
                .webClientSendPost(webClient,validateCVUrl,map,Map.class);
        String result = String.valueOf(answer.get("answer"));
        if(result == null || result.length() > 45) {
            pdfService.deleteFile(linkToCV);
            throw new FileNotCVException(result);
        } else {
            avyUser.setLinkToCV(linkToCV);
            return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
        }
    }

    @Override
    @Transactional
    public AvyUserDto deleteCV(AvyUser avyUser) {
        pdfService.deleteFile(avyUser.getLinkToCV());
        avyUser.setLinkToCV(null);
        return avyUserConverter.avyUserToAvyUserDto(avyUserRepository.save(avyUser));
    }

    @Override
    public void createAsset(AvyUser avyUser, Asset asset) {
        boolean added = avyUser.getAssets().add(asset);
        if(added) {
            avyUserRepository.save(avyUser);
        } else {
            throw new AssetAlreadyExistsException("The user has already been awarded NFT related to this lesson");
        }
    }


    @Override
    @Transactional(readOnly = true)
    public Page<AvyUser> searchUsers(SearchFilterDto filter) {
        String keyword = filter.getKeyword();
        String[] s = new String[]{""};
        if(keyword != null) {
            s = keyword.trim().split("\\s+");
        }
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<AvyUser> query = cb.createQuery(AvyUser.class);
        Root<AvyUser> root = query.from(AvyUser.class);
        Predicate[] locationPredicates = getLocationPredicates(cb,root,filter);
        if(filter.getState() != null && !filter.getState().isEmpty()) {
            filtrate(query,cb,root,s,locationPredicates);
        } else if(filter.getCity() != null && !filter.getCity().isEmpty()) {
            filtrate(query,cb,root,s,new Predicate[]{locationPredicates[1],locationPredicates[2]});
        } else if(filter.getCountry() != null && !filter.getCountry().isEmpty()) {
            filtrate(query,cb,root,s,new Predicate[]{locationPredicates[2]});
        } else {
            filtrate(query,cb,root,s,null);
        }
        TypedQuery<AvyUser> typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult(filter.getPageOrdinal());
        typedQuery.setMaxResults(3);
        List<AvyUser> resultList = typedQuery.getResultList();
        return new PageImpl<>(resultList);
    }

    public Predicate[] getLocationPredicates(CriteriaBuilder cb, Root<AvyUser> root, SearchFilterDto filter) {
        return new Predicate[] {
                cb.like(cb.lower(root.get("location").get("state")),"%" + filter.getState().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("location").get("city")),"%" + filter.getCity().toLowerCase() + "%"),
                cb.like(cb.lower(root.get("location").get("country")),"%"+filter.getCountry().toLowerCase()+"%")
        };
    }

    public Predicate[] getSingleKeywordPredicates(CriteriaBuilder cb, Root<AvyUser> root, String s) {
        return new Predicate[] {
                cb.like(cb.lower(root.get("firstName")),"%" + s.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("lastName")),"%" + s.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("userName")),"%" + s.toLowerCase() + "%")
        };
    }

    public Predicate[] getKeywordPredicates(CriteriaBuilder cb, Root<AvyUser> root, String[] s) {
        if(s.length > 2) {
            String combined = String.join(" ", Arrays.copyOfRange(s, 1, s.length));
            s = new String[]{s[0], combined};
        }
        return new Predicate[] {
                cb.and(cb.like(cb.lower(root.get("firstName")),"%" + s[0].toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("lastName")),"%" + s[1].toLowerCase() + "%")),
                cb.and(cb.like(cb.lower(root.get("firstName")),"%" + s[1].toLowerCase() + "%"),
                        cb.like(cb.lower(root.get("lastName")),"%" + s[0].toLowerCase() + "%"))
        };
    }

    public void filtrate(CriteriaQuery<AvyUser> query, CriteriaBuilder cb,Root<AvyUser> root, String[] s,Predicate[] predicate) {
        Predicate[] orPredicate = (s.length == 1)
                ? getSingleKeywordPredicates(cb, root, s[0])
                : getKeywordPredicates(cb, root, s);
        if (predicate != null) {
            query.where(cb.and(predicate), cb.or(orPredicate));
        } else {
            query.where(cb.or(orPredicate));
        }
    }

    @PostConstruct
    public void initUsers() {
        if(avyUserRepository.findAll().size() < 100 ) {
            System.out.println("size before insertion: " + avyUserRepository.findAll().size());
            List<AvyUser> mockedUsers = List.of(
                    AvyUser.builder().firstName("Liam").lastName("Smith").userName("liam123")
                            .email("liam@gmail.com").password("pass123")
                            .location(new Location("Texas", "Dallas", "USA")).build(),
                    AvyUser.builder().firstName("Emma").lastName("Johnson").userName("emma_88")
                            .email("emma@gmail.com").password("pass456")
                            .location(new Location("California", "Los Angeles", "USA")).build(),
                    AvyUser.builder().firstName("Noah").lastName("Williams").userName("noah_w")
                            .email("noah@gmail.com").password("pass789")
                            .location(new Location("Hessen", "Frankfurt", "Germany")).build(),
                    AvyUser.builder().firstName("Olivia").lastName("Brown").userName("oliviaB")
                            .email("olivia@gmail.com").password("pass101")
                            .location(new Location("Ontario", "Toronto", "Canada")).build(),
                    AvyUser.builder().firstName("Elijah").lastName("Garcia").userName("elijah.g")
                            .email("elijah@gmail.com").password("pass202")
                            .location(new Location("Île-de-France", "Paris", "France")).build(),
                    AvyUser.builder().firstName("Sophia").lastName("Martinez").userName("sophia.m")
                            .email("sophia@gmail.com").password("pass303")
                            .location(new Location("Vienna", "Vienna", "Austria")).build(),
                    AvyUser.builder().firstName("James").lastName("Lopez").userName("jamesLo")
                            .email("james@gmail.com").password("pass404")
                            .location(new Location("Andalusia", "Seville", "Spain")).build(),
                    AvyUser.builder().firstName("Mia").lastName("Gonzalez").userName("mia_g")
                            .email("mia@gmail.com").password("pass505")
                            .location(new Location("Porto", "Porto", "Portugal")).build(),
                    AvyUser.builder().firstName("Benjamin").lastName("Harris").userName("ben_h")
                            .email("benjamin@gmail.com").password("pass606")
                            .location(new Location("", "Stockholm", "Sweden")).build(),
                    AvyUser.builder().firstName("Charlotte").lastName("Clark").userName("char_c")
                            .email("charlotte@gmail.com").password("pass707")
                            .location(new Location("New York", "New York", "USA")).build(),
                    AvyUser.builder().firstName("William").lastName("Lewis").userName("will_l")
                            .email("william@gmail.com").password("pass808")
                            .location(new Location("", "Oslo", "Norway")).build(),
                    AvyUser.builder().firstName("Evelyn").lastName("Walker").userName("evelyn_w")
                            .email("evelyn@gmail.com").password("pass909")
                            .location(new Location("", "Istanbul", "Turkey")).build(),
                    AvyUser.builder().firstName("Henry").lastName("Hall").userName("henryH")
                            .email("henry@gmail.com").password("pass1010")
                            .location(new Location("Mexico City", "Mexico City", "Mexico")).build(),
                    AvyUser.builder().firstName("Amelia").lastName("Allen").userName("amelia_a")
                            .email("amelia@gmail.com").password("pass1111")
                            .location(new Location("Lombardy", "Milan", "Italy")).build(),
                    AvyUser.builder().firstName("Jack").lastName("Young").userName("jackY")
                            .email("jack@gmail.com").password("pass1212")
                            .location(new Location("Queensland", "Brisbane", "Australia")).build(),
                    AvyUser.builder().firstName("Harper").lastName("King").userName("harper_k")
                            .email("harper@gmail.com").password("pass1313")
                            .location(new Location("", "Doha", "Qatar")).build(),
                    AvyUser.builder().firstName("Sebastian").lastName("Wright").userName("seb_w")
                            .email("sebastian@gmail.com").password("pass1414")
                            .location(new Location("", "Beirut", "Lebanon")).build(),
                    AvyUser.builder().firstName("Lucas").lastName("Scott").userName("lucas_s")
                            .email("lucas@gmail.com").password("pass1515")
                            .location(new Location("", "Warsaw", "Poland")).build(),
                    AvyUser.builder().firstName("Ava").lastName("Green").userName("ava_g")
                            .email("ava@gmail.com").password("pass1616")
                            .location(new Location("", "Amsterdam", "Netherlands")).build(),
                    AvyUser.builder().firstName("Daniel").lastName("Baker").userName("dan_b")
                            .email("daniel@gmail.com").password("pass1717")
                            .location(new Location("São Paulo", "São Paulo", "Brazil")).build(),
                    AvyUser.builder().firstName("Isabella").lastName("Gonzalez").userName("isa_g")
                            .email("isabella@gmail.com").password("pass1818")
                            .location(new Location("", "Copenhagen", "Denmark")).build(),
                    AvyUser.builder().firstName("Matthew").lastName("Nelson").userName("matt_n")
                            .email("matthew@gmail.com").password("pass1919")
                            .location(new Location("Vienna", "Vienna", "Austria")).build(),
                    AvyUser.builder().firstName("Sofia").lastName("Carter").userName("sofia_c")
                            .email("sofia@gmail.com").password("pass2020")
                            .location(new Location("Hessen", "Frankfurt", "Germany")).build(),
                    AvyUser.builder().firstName("David").lastName("Mitchell").userName("david_m")
                            .email("david@gmail.com").password("pass2121")
                            .location(new Location("Ontario", "Toronto", "Canada")).build(),
                    AvyUser.builder().firstName("Ella").lastName("Perez").userName("ella_p")
                            .email("ella@gmail.com").password("pass2222")
                            .location(new Location("Île-de-France", "Paris", "France")).build(),
                    AvyUser.builder().firstName("Joseph").lastName("Roberts").userName("joe_r")
                            .email("joseph@gmail.com").password("pass2323")
                            .location(new Location("Porto", "Porto", "Portugal")).build(),
                    AvyUser.builder().firstName("Mila").lastName("Reed").userName("mila_r")
                            .email("mila@gmail.com").password("pass2424")
                            .location(new Location("Queensland", "Brisbane", "Australia")).build(),
                    AvyUser.builder().firstName("John").lastName("Stevens").userName("john_s")
                            .email("johns@gmail.com").password("pass2525")
                            .location(new Location("Texas", "Dallas", "USA")).build(),
                    AvyUser.builder().firstName("Aria").lastName("Campbell").userName("aria_c")
                            .email("aria@gmail.com").password("pass2626")
                            .location(new Location("", "Stockholm", "Sweden")).build(),
                    AvyUser.builder().firstName("Liam").lastName("Taylor").userName("liam_t")
                            .email("liamtaylor@gmail.com").password("pass3001")
                            .location(new Location("Texas", "Austin", "USA")).build(),
                    AvyUser.builder().firstName("Emily").lastName("Williams").userName("emily_w")
                            .email("emily@gmail.com").password("pass3002")
                            .location(new Location("California", "San Francisco", "USA")).build(),
                    AvyUser.builder().firstName("James").lastName("Harris").userName("james_h")
                            .email("james_harris@gmail.com").password("pass3003")
                            .location(new Location("Hessen", "Frankfurt", "Germany")).build(),
                    AvyUser.builder().firstName("Oliver").lastName("Scott").userName("oliver_s")
                            .email("oliver_s@gmail.com").password("pass3004")
                            .location(new Location("Ontario", "Ottawa", "Canada")).build(),
                    AvyUser.builder().firstName("Mason").lastName("Allen").userName("mason_a")
                            .email("mason@gmail.com").password("pass3005")
                            .location(new Location("Île-de-France", "Paris", "France")).build(),
                    AvyUser.builder().firstName("Amelia").lastName("Adams").userName("amelia_a")
                            .email("amelia_adams@gmail.com").password("pass3006")
                            .location(new Location("Vienna", "Vienna", "Austria")).build(),
                    AvyUser.builder().firstName("Benjamin").lastName("Clark").userName("benjamin_c")
                            .email("benjamin_clark@gmail.com").password("pass3007")
                            .location(new Location("Andalusia", "Malaga", "Spain")).build(),
                    AvyUser.builder().firstName("Sophie").lastName("Taylor").userName("sophie_t")
                            .email("sophie_taylor@gmail.com").password("pass3008")
                            .location(new Location("Porto", "Porto", "Portugal")).build(),
                    AvyUser.builder().firstName("Isabella").lastName("Walker").userName("isabella_w")
                            .email("isabella_walker@gmail.com").password("pass3009")
                            .location(new Location("", "Stockholm", "Sweden")).build(),
                    AvyUser.builder().firstName("Henry").lastName("Mitchell").userName("henry_m")
                            .email("henry_mitchell@gmail.com").password("pass3010")
                            .location(new Location("Oslo", "Oslo", "Norway")).build(),
                    AvyUser.builder().firstName("Charlotte").lastName("Brown").userName("charlotte_b")
                            .email("charlotte_brown@gmail.com").password("pass3011")
                            .location(new Location("Istanbul", "Istanbul", "Turkey")).build(),
                    AvyUser.builder().firstName("Samuel").lastName("Davis").userName("samuel_d")
                            .email("samuel_davis@gmail.com").password("pass3012")
                            .location(new Location("Mexico City", "Mexico City", "Mexico")).build(),
                    AvyUser.builder().firstName("Ava").lastName("King").userName("ava_k")
                            .email("ava_king@gmail.com").password("pass3013")
                            .location(new Location("Lombardy", "Milan", "Italy")).build(),
                    AvyUser.builder().firstName("Sofia").lastName("Gonzalez").userName("sofia_g")
                            .email("sofia_gonzalez@gmail.com").password("pass3014")
                            .location(new Location("Queensland", "Brisbane", "Australia")).build(),
                    AvyUser.builder().firstName("David").lastName("Johnson").userName("david_j")
                            .email("david_johnson@gmail.com").password("pass3015")
                            .location(new Location("", "Doha", "Qatar")).build(),
                    AvyUser.builder().firstName("Lucas").lastName("Young").userName("lucas_y")
                            .email("lucas_young@gmail.com").password("pass3016")
                            .location(new Location("", "Beirut", "Lebanon")).build(),
                    AvyUser.builder().firstName("Madison").lastName("Moore").userName("madison_m")
                            .email("madison_moore@gmail.com").password("pass3017")
                            .location(new Location("", "Warsaw", "Poland")).build(),
                    AvyUser.builder().firstName("Jackson").lastName("Taylor").userName("jackson_t")
                            .email("jackson_taylor@gmail.com").password("pass3018")
                            .location(new Location("", "Amsterdam", "Netherlands")).build(),
                    AvyUser.builder().firstName("Ella").lastName("Harris").userName("ella_h")
                            .email("ella_harris@gmail.com").password("pass3019")
                            .location(new Location("São Paulo", "São Paulo", "Brazil")).build(),
                    AvyUser.builder().firstName("Olivia").lastName("Nelson").userName("olivia_n")
                            .email("olivia_nelson@gmail.com").password("pass3020")
                            .location(new Location("", "Copenhagen", "Denmark")).build(),
                    AvyUser.builder().firstName("Sophia").lastName("Parker").userName("sophia_p")
                            .email("sophia_parker@gmail.com").password("pass3021")
                            .location(new Location("Vienna", "Vienna", "Austria")).build(),
                    AvyUser.builder().firstName("Matthew").lastName("Miller").userName("matthew_m")
                            .email("matthew_miller@gmail.com").password("pass3022")
                            .location(new Location("Hessen", "Frankfurt", "Germany")).build(),
                    AvyUser.builder().firstName("Mia").lastName("Roberts").userName("mia_r")
                            .email("mia_roberts@gmail.com").password("pass3023")
                            .location(new Location("Ontario", "Toronto", "Canada")).build(),
                    AvyUser.builder().firstName("James").lastName("Reed").userName("james_r")
                            .email("james_reed@gmail.com").password("pass3024")
                            .location(new Location("Île-de-France", "Paris", "France")).build(),
                    AvyUser.builder().firstName("Noah").lastName("Carter").userName("noah_c")
                            .email("noah_carter@gmail.com").password("pass3025")
                            .location(new Location("Porto", "Porto", "Portugal")).build(),
                    AvyUser.builder().firstName("John").lastName("Young").userName("john_y")
                            .email("john_young@gmail.com").password("pass3026")
                            .location(new Location("Queensland", "Brisbane", "Australia")).build(),
                    AvyUser.builder().firstName("Evelyn").lastName("Hall").userName("evelyn_h")
                            .email("evelyn_hall@gmail.com").password("pass3027")
                            .location(new Location("Texas", "Dallas", "USA")).build(),
                    AvyUser.builder().firstName("Jack").lastName("Baker").userName("jack_b")
                            .email("jack_baker@gmail.com").password("pass3028")
                            .location(new Location("Stockholm", "Stockholm", "Sweden")).build(),
                    AvyUser.builder().firstName("Sophia").lastName("Roberts").userName("sophia_r")
                            .email("sophia_roberts@gmail.com").password("pass3029")
                            .location(new Location("New York", "New York", "USA")).build(),
                    AvyUser.builder().firstName("Mason").lastName("Green").userName("mason_g")
                            .email("mason_green@gmail.com").password("pass3030")
                            .location(new Location("", "Istanbul", "Turkey")).build(),
                    AvyUser.builder().firstName("Liam").lastName("Reed").userName("liam_r")
                            .email("liam_reed@gmail.com").password("pass3032")
                            .location(new Location("California", "San Diego", "USA")).build(),
                    AvyUser.builder().firstName("William").lastName("Davis").userName("will_d")
                            .email("william_davis@gmail.com").password("pass3033")
                            .location(new Location("Hessen", "Wiesbaden", "Germany")).build(),
                    AvyUser.builder().firstName("Isabella").lastName("King").userName("isa_k")
                            .email("isabella_king@gmail.com").password("pass3034")
                            .location(new Location("Ontario", "Ottawa", "Canada")).build(),
                    AvyUser.builder().firstName("Ethan").lastName("Lewis").userName("ethan_l")
                            .email("ethan_lewis@gmail.com").password("pass3035")
                            .location(new Location("Île-de-France", "Paris", "France")).build(),
                    AvyUser.builder().firstName("Charlotte").lastName("Miller").userName("charlotte_m")
                            .email("charlotte_miller@gmail.com").password("pass3036")
                            .location(new Location("Vienna", "Vienna", "Austria")).build(),
                    AvyUser.builder().firstName("Sophia").lastName("Allen").userName("sophia_a")
                            .email("sophia_allen@gmail.com").password("pass3037")
                            .location(new Location("Andalusia", "Sevilla", "Spain")).build(),
                    AvyUser.builder().firstName("Jacob").lastName("Gonzalez").userName("jacob_g")
                            .email("jacob_gonzalez@gmail.com").password("pass3038")
                            .location(new Location("Porto", "Porto", "Portugal")).build(),
                    AvyUser.builder().firstName("Grace").lastName("Harris").userName("grace_h")
                            .email("grace_harris@gmail.com").password("pass3039")
                            .location(new Location("", "Stockholm", "Sweden")).build(),
                    AvyUser.builder().firstName("Mia").lastName("Nelson").userName("mia_n")
                            .email("mia_nelson@gmail.com").password("pass3040")
                            .location(new Location("Oslo", "Oslo", "Norway")).build(),
                    AvyUser.builder().firstName("Amelia").lastName("Taylor").userName("amelia_t")
                            .email("amelia_taylor@gmail.com").password("pass3041")
                            .location(new Location("Istanbul", "Istanbul", "Turkey")).build(),
                    AvyUser.builder().firstName("Benjamin").lastName("Mitchell").userName("ben_m")
                            .email("benjamin_mitchell@gmail.com").password("pass3042")
                            .location(new Location("Mexico City", "Mexico City", "Mexico")).build(),
                    AvyUser.builder().firstName("Lucas").lastName("Roberts").userName("lucas_r")
                            .email("lucas_roberts@gmail.com").password("pass3043")
                            .location(new Location("Lombardy", "Milan", "Italy")).build(),
                    AvyUser.builder().firstName("Ella").lastName("Carter").userName("ella_c")
                            .email("ella_carter@gmail.com").password("pass3044")
                            .location(new Location("Queensland", "Brisbane", "Australia")).build(),
                    AvyUser.builder().firstName("David").lastName("Baker").userName("david_b")
                            .email("david_baker@gmail.com").password("pass3045")
                            .location(new Location("", "Doha", "Qatar")).build(),
                    AvyUser.builder().firstName("William").lastName("Green").userName("will_g")
                            .email("will_green@gmail.com").password("pass3046")
                            .location(new Location("", "Beirut", "Lebanon")).build(),
                    AvyUser.builder().firstName("Samuel").lastName("Walker").userName("samuel_w")
                            .email("samuel_walker@gmail.com").password("pass3047")
                            .location(new Location("", "Warsaw", "Poland")).build(),
                    AvyUser.builder().firstName("Sophia").lastName("Clark").userName("sophia_c")
                            .email("sophia_clark@gmail.com").password("pass3048")
                            .location(new Location("", "Amsterdam", "Netherlands")).build(),
                    AvyUser.builder().firstName("Jackson").lastName("Martinez").userName("jackson_m")
                            .email("jackson_martinez@gmail.com").password("pass3049")
                            .location(new Location("São Paulo", "São Paulo", "Brazil")).build(),
                    AvyUser.builder().firstName("Mason").lastName("Carter").userName("mason_c")
                            .email("mason_carter@gmail.com").password("pass3050")
                            .location(new Location("", "Copenhagen", "Denmark")).build(),
                    AvyUser.builder().firstName("Noah").lastName("Lee").userName("noah_l")
                            .email("noah_lee@gmail.com").password("pass3051")
                            .location(new Location("Vienna", "Vienna", "Austria")).build(),
                    AvyUser.builder().firstName("Jack").lastName("Wright").userName("jack_w")
                            .email("jack_wright@gmail.com").password("pass3052")
                            .location(new Location("Hessen", "Frankfurt", "Germany")).build(),
                    AvyUser.builder().firstName("James").lastName("Hall").userName("james_h")
                            .email("james_hall@gmail.com").password("pass3053")
                            .location(new Location("Ontario", "Toronto", "Canada")).build(),
                    AvyUser.builder().firstName("Elijah").lastName("Walker").userName("elijah_w")
                            .email("elijah_walker@gmail.com").password("pass3054")
                            .location(new Location("Île-de-France", "Paris", "France")).build(),
                    AvyUser.builder().firstName("Benjamin").lastName("Allen").userName("benjamin_a")
                            .email("benjamin_allen@gmail.com").password("pass3055")
                            .location(new Location("Porto", "Porto", "Portugal")).build(),
                    AvyUser.builder().firstName("Lucas").lastName("Nelson").userName("lucas_n")
                            .email("lucas_nelson@gmail.com").password("pass3056")
                            .location(new Location("Queensland", "Brisbane", "Australia")).build(),
                    AvyUser.builder().firstName("Grace").lastName("Baker").userName("grace_b")
                            .email("grace_baker@gmail.com").password("pass3057")
                            .location(new Location("Texas", "Dallas", "USA")).build(),
                    AvyUser.builder().firstName("Sophia").lastName("Harris").userName("sophia_h")
                            .email("sophia_harris@gmail.com").password("pass3058")
                            .location(new Location("", "Stockholm", "Sweden")).build(),
                    AvyUser.builder().firstName("Mason").lastName("Reed").userName("mason_r")
                            .email("mason_reed@gmail.com").password("pass3059")
                            .location(new Location("Oslo", "Oslo", "Norway")).build(),
                    AvyUser.builder().firstName("Charlotte").lastName("Baker").userName("charlotte_b")
                            .email("charlotte_baker@gmail.com").password("pass3060")
                            .location(new Location("Istanbul", "Istanbul", "Turkey")).build(),
                    AvyUser.builder().firstName("Liam").lastName("Johnson").userName("liam_j")
                            .email("liam_johnson@gmail.com").password("pass3061")
                            .location(new Location("London", "London", "United Kingdom")).build(),
                    AvyUser.builder().firstName("Ava").lastName("Martinez").userName("ava_m")
                            .email("ava_martinez@gmail.com").password("pass3062")
                            .location(new Location("Madrid", "Madrid", "Spain")).build(),
                    AvyUser.builder().firstName("Lucas").lastName("Roberts").userName("lucas_r")
                            .email("lucas_roberts@gmail.com").password("pass3063")
                            .location(new Location("New South Wales", "Sydney", "Australia")).build(),
                    AvyUser.builder().firstName("Mia").lastName("Wilson").userName("mia_w")
                            .email("mia_wilson@gmail.com").password("pass3064")
                            .location(new Location("Tokyo", "Tokyo", "Japan")).build(),
                    AvyUser.builder().firstName("Sophia").lastName("Young").userName("sophia_y")
                            .email("sophia_young@gmail.com").password("pass3065")
                            .location(new Location("Milan", "Milan", "Italy")).build(),
                    AvyUser.builder().firstName("James").lastName("Scott").userName("james_s")
                            .email("james_scott@gmail.com").password("pass3066")
                            .location(new Location("Berlin", "Berlin", "Germany")).build(),
                    AvyUser.builder().firstName("Charlotte").lastName("Moore").userName("charlotte_m")
                            .email("charlotte_moore@gmail.com").password("pass3067")
                            .location(new Location("Paris", "Paris", "France")).build(),
                    AvyUser.builder().firstName("Amelia").lastName("Harris").userName("amelia_h")
                            .email("amelia_harris@gmail.com").password("pass3068")
                            .location(new Location("New York", "New York", "USA")).build(),
                    AvyUser.builder().firstName("Benjamin").lastName("Taylor").userName("benjamin_t")
                            .email("benjamin_taylor@gmail.com").password("pass3069")
                            .location(new Location("Rio de Janeiro", "Rio de Janeiro", "Brazil")).build(),
                    AvyUser.builder().firstName("Isabella").lastName("Perez").userName("isa_p")
                            .email("isabella_perez@gmail.com").password("pass3070")
                            .location(new Location("Dubai", "Dubai", "UAE")).build())
            ;
//            mockedUsers.forEach();
            avyUserRepository.saveAll(mockedUsers);
            System.out.println("size after insertion: " + avyUserRepository.findAll().size());
        }
    }

}
