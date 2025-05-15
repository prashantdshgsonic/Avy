package com.example.avyproject.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
public enum AchievementCategory {

    sport("sport"),
    language("language"),
    business("business"),
    it("it"),
    design("design"),
    marketing("marketing"),
    technology("technology"),
    programming("programming"),
    blockchain_and_crypto("blockchain_and_crypto"),
    trading("trading"),
    video_production("video_production"),
    graphic_design("graphic_design"),
    photography("photography"),
    arts_and_crafts("arts_and_crafts"),
    health_and_fitness("health_and_fitness"),
    personal_development("personal_development"),
    work_from_home_business("work_from_home_business"),
    entrepreneurship("entrepreneurship"),
    freelancing("freelancing"),
    consulting("consulting"),
    business_management("business_management"),
    social_media_marketing("social_media_marketing"),
    content_marketing("content_marketing"),
    digital_marketing("digital_marketing"),
    machine_learning("machine_learning"),
    artificial_intelligence("artificial_intelligence"),
    data_science("data_science"),
    cybersecurity("cybersecurity"),
    computer_science("computer_science"),
    python("python"),
    javascript("javascript"),
    php("php"),
    css("css"),
    react("react"),
    cryptocurrency_investing("cryptocurrency_investing"),
    cryptocurrency_application("cryptocurrency_application"),
    nfts("nfts"),
    web_3("web_3"),
    forex("forex"),
    day_trading("day_trading"),
    mobile_photography("mobile_photography"),
    wedding_photography("wedding_photography"),
    editing("editing"),
    lighting("lighting"),
    digital_photography("digital_photography"),
    drawing_painting("drawing_painting"),
    carpentry("carpentry"),
    pottery("pottery"),
    building("building"),
    nutrition("nutrition"),
    weight_loss("weight_loss"),
    mental_health("mental_health"),
    fitness("fitness"),
    dieting("dieting"),
    bio_hacking("bio_hacking"),
    productivity("productivity"),
    habits("habits"),
    relationships("relationships"),
    confidence_happiness("confidence_happiness");


    private final String description;

        AchievementCategory(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
}
