-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: stylish
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `color` varchar(45) NOT NULL,
  `color_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES ('08','98'),('1023','1203'),('2310','231'),('6986','876'),('black','000000'),('grey','AAAAAA'),('white','FFFFFF');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hot`
--

DROP TABLE IF EXISTS `hot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hot` (
  `hot` varchar(45) NOT NULL,
  `hot_info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`hot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot`
--

LOCK TABLES `hot` WRITE;
/*!40000 ALTER TABLE `hot` DISABLE KEYS */;
INSERT INTO `hot` VALUES ('',NULL),('123',NULL),('210',NULL),('68',NULL),('98',NULL);
/*!40000 ALTER TABLE `hot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `note` varchar(45) NOT NULL,
  `note_info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`note`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES ('',NULL),('230',NULL),('310',NULL),('89',NULL),('99',NULL);
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_color` varchar(45) DEFAULT NULL,
  `product_size` varchar(45) DEFAULT NULL,
  `product_value` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `fk_order_items_stylish_order1_idx` (`order_id`),
  CONSTRAINT `fk_order_items_stylish_order1` FOREIGN KEY (`order_id`) REFERENCES `stylish_order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL,
  `rec_trade_id` varchar(45) DEFAULT NULL,
  `bank_transaction_id` varchar(45) DEFAULT NULL,
  `auth_code` varchar(45) DEFAULT NULL,
  `last_four` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `bin_code` varchar(45) DEFAULT NULL,
  `card_identifier` varchar(45) DEFAULT NULL,
  `merchant_id` varchar(45) DEFAULT NULL,
  `prime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment_stylish_order1_idx` (`order_id`),
  CONSTRAINT `fk_payment_stylish_order1` FOREIGN KEY (`order_id`) REFERENCES `stylish_order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `place` varchar(45) NOT NULL,
  `place_info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`place`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES ('2',NULL),('231',NULL),('7',NULL),('98',NULL),('台灣',NULL);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int(11) unsigned NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `story` varchar(45) DEFAULT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `texture` varchar(45) DEFAULT NULL,
  `wash` varchar(45) DEFAULT NULL,
  `place` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `hot` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `wash_idx` (`wash`),
  KEY `note_idx` (`note`),
  KEY `texture_idx` (`texture`),
  KEY `type_idx` (`type`),
  KEY `place_idx` (`place`),
  KEY `hot_idx` (`hot`),
  CONSTRAINT `hot` FOREIGN KEY (`hot`) REFERENCES `hot` (`hot`),
  CONSTRAINT `note` FOREIGN KEY (`note`) REFERENCES `note` (`note`),
  CONSTRAINT `place` FOREIGN KEY (`place`) REFERENCES `place` (`place`),
  CONSTRAINT `texture` FOREIGN KEY (`texture`) REFERENCES `texture` (`texture`),
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `type` (`type`),
  CONSTRAINT `wash` FOREIGN KEY (`wash`) REFERENCES `wash` (`wash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'test1','12',12301,'0','1577944543861','310','23012','11','2','1','210'),(2,'test2','12',12301,'0','1577944569828','310','23012','11','2','2','210'),(3,'test3','12',12301,'0','1577944595005','310','23012','11','2','3','210'),(4,'test4','12',12301,'0','1577944619680','310','23012','11','2','1','210'),(5,'test5','12',12301,'0','1577944642989','310','23012','11','2','2','210'),(6,'test6','12',12301,'0','1577944666234','310','23012','11','2','3','210'),(7,'紳士西裝三件組','高抗寒素材選用，保暖也時尚有型',5999,'男士的必備戰衣，紳士西裝三件組','1584079713328','','天蠶絲','請用冷水清洗或送洗','台灣','men','');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `product_color_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_color_id`),
  KEY `product_color_product_idx` (`product_id`),
  KEY `color_idx` (`color`),
  CONSTRAINT `color` FOREIGN KEY (`color`) REFERENCES `color` (`color`),
  CONSTRAINT `product_color_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (102,1,'2310'),(103,2,'2310'),(104,3,'2310'),(105,4,'2310'),(106,5,'2310'),(107,6,'2310'),(112,7,'white'),(113,7,'black'),(114,7,'grey');
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `iamges_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iamges_id`),
  KEY `images_product_idx` (`product_id`),
  CONSTRAINT `images_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (78,1,'1577944543863'),(79,1,'1577944543869'),(80,2,'1577944569830'),(81,2,'1577944569833'),(82,3,'1577944595006'),(83,3,'1577944595009'),(84,4,'1577944619682'),(85,4,'1577944619687'),(86,5,'1577944642990'),(87,5,'1577944642993'),(88,6,'1577944666235'),(89,6,'1577944666239'),(96,7,'1584079713335'),(97,7,'1584079713372');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `product_size_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_size_id`),
  KEY `product_size_product_idx` (`product_id`),
  KEY `size_idx` (`size`),
  CONSTRAINT `product_size_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `size` FOREIGN KEY (`size`) REFERENCES `size` (`size`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (139,1,'231023'),(140,2,'231023'),(141,3,'231023'),(142,4,'231023'),(143,5,'231023'),(144,6,'231023'),(149,7,'xs'),(150,7,'m'),(151,7,'l');
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `size` varchar(45) NOT NULL,
  `size_info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES ('098','89'),('123','023'),('231023','1023'),('876','78687'),('l','大'),('m','中'),('xs','特小');
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stylish_order`
--

DROP TABLE IF EXISTS `stylish_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stylish_order` (
  `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `shipping` varchar(45) DEFAULT NULL,
  `payment` varchar(45) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `subtotal` varchar(45) DEFAULT NULL,
  `freight` varchar(45) DEFAULT NULL,
  `total` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `pay_yet` varchar(45) DEFAULT NULL,
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `fk_stylish_order_user1_idx` (`user_id`),
  CONSTRAINT `fk_stylish_order_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stylish_order`
--

LOCK TABLES `stylish_order` WRITE;
/*!40000 ALTER TABLE `stylish_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `stylish_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `texture`
--

DROP TABLE IF EXISTS `texture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `texture` (
  `texture` varchar(45) NOT NULL,
  `texture_info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`texture`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `texture`
--

LOCK TABLES `texture` WRITE;
/*!40000 ALTER TABLE `texture` DISABLE KEYS */;
INSERT INTO `texture` VALUES ('03',NULL),('23012',NULL),('68',NULL),('89',NULL),('天蠶絲',NULL);
/*!40000 ALTER TABLE `texture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type` varchar(45) NOT NULL,
  `type_info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES ('1','women'),('2','men'),('3','accessories'),('men',NULL);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `time_now` varchar(255) DEFAULT NULL,
  `expired_time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (37,'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','native','發財種子','test@test.com',NULL,'d5cf9342fc7208faabc5bb01783ca9ed7e4e96577601eeb42bb31c5b5673efc6','1584078873301','3600');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `product_id` int(11) unsigned NOT NULL,
  `size` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `stock` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`product_id`,`size`,`color`),
  KEY `variant_product_color_idx` (`color`),
  KEY `variant_product_size_idx` (`size`),
  CONSTRAINT `variant_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `variant_product_color` FOREIGN KEY (`color`) REFERENCES `product_color` (`color`),
  CONSTRAINT `variant_product_size` FOREIGN KEY (`size`) REFERENCES `product_size` (`size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES (1,'231023','2310',0),(2,'231023','2310',0),(3,'231023','2310',0),(4,'231023','2310',0),(5,'231023','2310',0),(6,'231023','2310',0),(7,'l','black',3),(7,'l','grey',3),(7,'l','white',3),(7,'m','black',3),(7,'m','grey',3),(7,'m','white',3),(7,'xs','black',3),(7,'xs','grey',3),(7,'xs','white',3);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wash`
--

DROP TABLE IF EXISTS `wash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wash` (
  `wash` varchar(45) NOT NULL,
  `wash_info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`wash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wash`
--

LOCK TABLES `wash` WRITE;
/*!40000 ALTER TABLE `wash` DISABLE KEYS */;
INSERT INTO `wash` VALUES ('0231',NULL),('08',NULL),('11',NULL),('68',NULL),('請用冷水清洗或送洗',NULL);
/*!40000 ALTER TABLE `wash` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-13 16:35:02
