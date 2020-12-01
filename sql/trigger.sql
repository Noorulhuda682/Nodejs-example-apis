CREATE DEFINER=`root`@`localhost` TRIGGER `tickets_AFTER_INSERT` AFTER INSERT ON `tickets` FOR EACH ROW BEGIN
 IF (NEW.priority = 'low') THEN
 UPDATE `my-server`.`collaborations` SET `low`= `low`+1
 WHERE (`id`= NEW.collaborationId) ;
       
 END IF;
 
 IF (NEW.priority = 'medium') THEN
 UPDATE `my-server`.`collaborations` SET `medium`= `medium`+1
 WHERE (`id`= NEW.collaborationId) ;
       
 END IF;
 
 IF (NEW.priority = 'high') THEN
 UPDATE `my-server`.`collaborations` SET `high`= `high`+1
 WHERE (`id`= NEW.collaborationId) ;
       
 END IF;
END