import { useEffect, useState } from "react";
import s from "./UsersCompleted.module.css";
import { useDispatch, useSelector } from "react-redux";
import {   usersCompleted, createNFT } from "../../store/slice/adminCourseActions";
import AddNft from "../addNFT/AddNft";

export default function UsersCompleted() {
  const dispatch = useDispatch();
  const completedUsers = useSelector((state) => state.adminCourse.completedUsers);
  const loading = useSelector((state) => state.adminCourse.loading);
  const error = useSelector((state) => state.adminCourse.error);
  const courseId = useSelector((state) => state.adminCourse.courseInfo?.id);
    // console.log("Selected courseId in component:", courseId);
  const courseData = useSelector((state) => state.adminCourse.courseInfo);
    // console.log("courseData:", courseData);
  const nftSuccessMessage = useSelector((state) => state.adminCourse.successNFT);
  const nftError = useSelector((state) => state.adminCourse.nftError);
  const nftLoading = useSelector((state) => state.adminCourse.nftLoading);

  const [isEmptySearch, setIsEmptySearch] = useState(false);
  //   const nftCollectionAddress = useSelector((state) => state.adminCourse.nftCollectionAddress);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUser2, setSelectedUser2] = useState(null);

  // usersCompleted
  useEffect(() => {
    if (!isEmptySearch) {
      dispatch(usersCompleted({ courseId }));
    }
  }, [isEmptySearch, dispatch]);
  //   console.log("completedUsers", completedUsers);

   const handleCreateNFT = (userId) => {
    if (!courseId || !courseData) return;

    const selectedUser = completedUsers.find((user) => user.id === userId);
    const selectedUserId = selectedUser.id;
    setSelectedUser2(selectedUser)

      if (!selectedUserId) {
      console.error("couldnt find user!");
      return;
    }
    // console.log("userId handleCreateNFT:", selectedUser.id);
    // console.log("courseId handleCreateNFT:", courseId);

    setSelectedUserId(selectedUserId);
    setSelectedCourse(courseData);    
    setIsModalOpen(true);  
    };

    const handleSubmitNFT = (formData) => {
      // for (let pair of formData.entries()) {
      //   console.log("formData in handleSubmitNFT:", pair[0], pair[1]);
      // }

      // console.log("Sending from handleSubmitNFT:", { userId: selectedUserId, couresId: courseId,  nftFormData: formData });

      dispatch(createNFT({ 
        userId: selectedUserId, 
        courseId: courseId, 
        nftFormData: formData 
      })).then(() => {
        setIsModalOpen(false);
      }); 
    };

    // console.log("Selected userId in component:", selectedUserId) 
    // console.log('data ',completedUsers)

  return (
    <>
      <div className={s.section__content}>
        {loading && <p>Loading Users...</p>}

        {error && <p className={s.error}>{error}</p>}

        {!loading && !error && completedUsers.length === 0 && (
          <p className={s.message}>Users Completed not found</p>
        )}

        {completedUsers.map((user) => (
          <div key={user.id} className={s.userCard_wrapper}>
            <h6>Completed</h6>
            <div key={user.id} className={s.userCard}>
              <div className={s.userInfo}>
                <h5 className={s.firstText}>
                  {user.firstName} {user.lastName}
                </h5>
                <span className={s.secondText}>
                  {user.email}
                {/* {user.location ? 
                        `${user.location.city || ""} 
                          ${user.location.state || ""} 
                          ${user.location.country || ""}`
                    : "Location not available"}  */}

                  {/* {user.location?.city || ""}, {user.location?.state || ""}, */}
                  {/* {user.location?.country || ""} */} 
                </span>
              </div>

              <div className={s.btn_wrapper}>
                <button
                    className={`${s.btn} ${nftSuccessMessage[user.id] || nftError[user.id] ? 
                        s.disabledBtn : ""}`}
                    onClick={() => handleCreateNFT(user.id)}
                    // onClick={() => handleOpenModal(user)}
                    disabled={nftLoading[user.id] || nftSuccessMessage[user.id]}                
                >
                {nftLoading[user.id] ? "Creating NFT..." : "Create NFT"}
                </button>

                {nftSuccessMessage[user.id] && (
                    <span className={s.successMessage}>Successfully created!</span>
                )}
                
                {nftError[user.id] && (
                    <span className={s.errorRespond}>{nftError[user.id]}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for create NFT form */}
      {isModalOpen && selectedUserId && selectedCourse && (
        <AddNft 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // selectedUserId={selectedUserId}
          // courseId={courseId} 
          courseData={selectedCourse}
          // userName={selectedUser2.firstName+" "+ selectedUser2.lastName === null? "":selectedUser2.lastName}
          userName={`${selectedUser2.firstName} ${selectedUser2.lastName || ""}`}
          userEmail={`${selectedUser2.email}`}
          collectionId={courseData.collectionMintAddress}
          onSubmit={handleSubmitNFT}
        />
      )}
    </>
  );
}
