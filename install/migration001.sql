SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

ALTER TABLE `collections_auteur` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `collections_auteur_commons` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `collections_commons` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `collections_genre` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `collections_serie` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `collections_type` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

DELIMITER $$ CREATE  
    TRIGGER `collections_auteur_update` BEFORE UPDATE  
    ON `collections_auteur`  
      FOR EACH ROW BEGIN  
        SET NEW.updated_at = CURRENT_TIMESTAMP;   
END$$ DELIMITER ;

DELIMITER $$ CREATE  
    TRIGGER `collections_auteur_commons_update` BEFORE UPDATE  
    ON `collections_auteur_commons`  
      FOR EACH ROW BEGIN  
        SET NEW.updated_at = CURRENT_TIMESTAMP;   
END$$ DELIMITER ;

DELIMITER $$ CREATE  
    TRIGGER `collections_commons_update` BEFORE UPDATE  
    ON `collections_commons`  
      FOR EACH ROW BEGIN  
        SET NEW.updated_at = CURRENT_TIMESTAMP;   
END$$ DELIMITER ;

DELIMITER $$ CREATE  
    TRIGGER `collections_genre_update` BEFORE UPDATE  
    ON `collections_genre`  
      FOR EACH ROW BEGIN  
        SET NEW.updated_at = CURRENT_TIMESTAMP;   
END$$ DELIMITER ;

DELIMITER $$ CREATE  
    TRIGGER `collections_serie_update` BEFORE UPDATE  
    ON `collections_serie`  
      FOR EACH ROW BEGIN  
        SET NEW.updated_at = CURRENT_TIMESTAMP;   
END$$ DELIMITER ;

DELIMITER $$ CREATE  
    TRIGGER `collections_type_update` BEFORE UPDATE  
    ON `collections_type`  
      FOR EACH ROW BEGIN  
        SET NEW.updated_at = CURRENT_TIMESTAMP;   
END$$ DELIMITER ;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;