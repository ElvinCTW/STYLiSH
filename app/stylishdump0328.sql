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
INSERT INTO `color` VALUES ('08','98'),('1023','1203'),('2310','231'),('6986','876'),('black','000000'),('brown','80604D'),('grey','AAAAAA'),('navy','000080'),('red','FF0000'),('rose','E8909C'),('skyblue','87CEEB'),('tan','D2B48C'),('white','FFFFFF');
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
INSERT INTO `note` VALUES ('',NULL),('230',NULL),('310',NULL),('89',NULL),('99',NULL),('請勿水洗',NULL),('請用四十度以下熱水清洗',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (86,109,9,'skyblue','xs',2),(87,110,12,'navy','s',2),(88,111,7,'white','xs',2),(89,112,12,'navy','s',2),(90,113,12,'navy','s',2),(91,114,12,'navy','s',2),(92,115,12,'navy','s',2),(93,116,12,'navy','s',2),(94,117,12,'navy','s',2),(95,118,12,'navy','s',2),(96,119,12,'navy','s',2),(97,120,12,'navy','s',2),(98,121,12,'navy','s',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (58,109,'Duplicate bank_transaction_id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'bb664c84e81ca1993f912b40e6b9b315dd4a207181d7ba38022eaabd21cbb80b'),(59,110,'Duplicate bank_transaction_id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'be6da521bc457948bcbc1a9356d7309053f69398c213d20b4774fdc173355ca4'),(60,111,'Duplicate bank_transaction_id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'fb55346446a070f1637af39c8116e98b273cf44a9e4e586641ed1654b65086bb'),(61,112,'Duplicate bank_transaction_id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2509cc14afbaa677ade408e9423d1465f7cfaf4cca57479f4af816bd2b7f66a2'),(62,113,'Duplicate bank_transaction_id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'eadcfd382005b752cc61e72fb99a42ce93d46d48463aa1493283eeaa3868fbd8'),(63,114,'Duplicate bank_transaction_id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a88a8b0104f12e5c80d737540ca69ea0ca5b9a2e8ab63c2dd95ac4435b0c77c8'),(64,115,'Duplicate bank_transaction_id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0ad29e05ca1782bfa9e0f3c3ba6ea9adab75c36dce812c2c434f176851951860'),(65,116,'Invalid bank transaction id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'59d8169fabd6da0b77b1157c77e61f5621e7ad0421bb274089067a1fde2bdd1b'),(66,117,'Invalid bank transaction id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4a37addd4f6067474321b73b41e1df8e7de7f678bbba98e890b26b50cf4cbc4c'),(67,118,'Invalid bank transaction id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8e24d604490a2d2c344900c63fbcd9c0390dc415cfb00b84a7a4f94c69a4cbcf'),(68,119,'Invalid bank transaction id',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c6658ecdda49cf8c880110869955977a04155b5ccc0986c4db29deaff8e6e949'),(69,120,'D20200327suHg9G','STYLISHE120','621385','4242','UNITED KINGDOM','424242','dee921560b074be7a860a6b44a80c21b','AppWorksSchool_CTBC','dbb9ebc8c2f50abf5321af4f117eeaa269becc2b67c37ba18945209bccd73568'),(70,121,'D20200327LNxWkq','STYLISH100121','012563','4242','UNITED KINGDOM','424242','dee921560b074be7a860a6b44a80c21b','AppWorksSchool_CTBC','f61de3b5e87be7e4cb72504d7b7dfebd1a4d9358efb38a7b070192aebdc57a8e');
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
INSERT INTO `place` VALUES ('2',NULL),('231',NULL),('7',NULL),('98',NULL),('中國',NULL),('台灣',NULL),('英國',NULL);
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
INSERT INTO `product` VALUES (7,'紳士西裝三件組','高抗寒素材選用，保暖也時尚有型',5999,'男士的必備戰衣，紳士西裝三件組','1584079713328','','天蠶絲','請用冷水清洗或送洗','台灣','men',''),(8,'碎花小洋裝','夏天必備穿搭！',399,'夏天要到了，怎麼能沒有一件小洋裝！','1585301035425','請用四十度以下熱水清洗','棉、聚脂纖維','水洗','中國','women',''),(9,'藍色女裝襯衫','海的顏色！',399,'平時在城市中忙碌的你，穿上與大海的連結吧！','1585301168482','請用四十度以下熱水清洗','棉、聚脂纖維','水洗','中國','women',''),(10,'海灘亞麻帽','防曬黑神器！',399,'不想曬黑，又想維持清爽的造型？戴上一頂亞麻帽就對了！','1585301368034','請用四十度以下熱水清洗','亞麻','水洗','中國','accessories',''),(11,'紳士小帽','紳士的完成在於帽',499,'沒有一頂紳士小帽，別說你懂穿搭！','1585302826291','請勿水洗','羊毛','乾洗','中國','accessories',''),(12,'男士西裝上衣','商務人士首選',3999,'商務人士入門款必備海軍藍西裝！','1585303098835','請勿水洗','羊毛','乾洗','英國','men','');
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
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (112,7,'white'),(113,7,'black'),(114,7,'grey'),(115,8,'rose'),(116,9,'skyblue'),(117,10,'tan'),(118,11,'brown'),(119,12,'navy');
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
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (96,7,'1584079713335'),(97,7,'1584079713372'),(98,8,'1585301035430'),(99,8,'1585301035456'),(100,9,'1585301168484'),(101,9,'1585301168489'),(102,10,'1585301368036'),(103,10,'1585301368040'),(104,11,'1585302826295'),(105,11,'1585302826326'),(106,12,'1585303098836'),(107,12,'1585303098873');
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
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (149,7,'xs'),(150,7,'m'),(151,7,'l'),(152,8,'xs'),(153,8,'s'),(154,8,'m'),(155,8,'l'),(156,9,'xs'),(157,9,'s'),(158,9,'m'),(159,9,'l'),(160,10,'m'),(161,11,'m'),(162,12,'s'),(163,12,'m'),(164,12,'l'),(165,12,'xl');
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
INSERT INTO `size` VALUES ('098','89'),('123','023'),('231023','1023'),('876','78687'),('l','大'),('m','中'),('s','小'),('xl','特大'),('xs','特小');
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
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stylish_order`
--

LOCK TABLES `stylish_order` WRITE;
/*!40000 ALTER TABLE `stylish_order` DISABLE KEYS */;
INSERT INTO `stylish_order` VALUES (109,'delivery','credit_card','933afa9517afe3a94e937bb06d468fcace7810626caf8151e4158fb8e6ea457b','3211','11','3222','用戶一','0912345678','test@test.com','台北','晚上','not_yet',37),(110,'delivery','credit_card','933afa9517afe3a94e937bb06d468fcace7810626caf8151e4158fb8e6ea457b','3211','11','3222','用戶一','0912345678','test@test.com','台北','晚上','not_yet',37),(111,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3211','11','3222','用戶一','0912345678','test@test.com','台北','晚上','not_yet',39),(112,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(113,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(114,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(115,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(116,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(117,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(118,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(119,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','not_yet',39),(120,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','paid',39),(121,'delivery','credit_card','e0a503ccf823391b9757dad9d44dd6ec7ee9106bab4d37c002b05ca45f7493df','3321','11','3222','用戶一','0912345678','test2@test.com','台北','晚上','paid',39);
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
INSERT INTO `texture` VALUES ('03',NULL),('23012',NULL),('68',NULL),('89',NULL),('亞麻',NULL),('天蠶絲',NULL),('棉、聚脂纖維',NULL),('羊毛',NULL);
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
INSERT INTO `type` VALUES ('1','women'),('2','men'),('3','accessories'),('accessories',NULL),('men',NULL),('women',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (37,'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','native','用戶三','test@test.com',NULL,'fb47be8475d26ccf4157accccfd4fc52fcc19f2efaa0642e4a8e58269e58cbb6','1585315849100','3600'),(38,'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','native','用戶二','test1@test.com',NULL,'cfcbb0fa50c802ce10e27e03ad394fc7687a08580549582b965b235faa6f2329','1585313184819','3600'),(39,'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','native','用戶一','test2@test.com',NULL,'8e9fc75ee84509de8fc7702947cac378f999e14998d48581478a887e3435527f','1585315787222','3600');
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
INSERT INTO `variant` VALUES (7,'l','black',3),(7,'l','grey',3),(7,'l','white',3),(7,'m','black',3),(7,'m','grey',3),(7,'m','white',3),(7,'xs','black',3),(7,'xs','grey',3),(7,'xs','white',3),(8,'l','rose',30),(8,'m','rose',30),(8,'s','rose',30),(8,'xs','rose',30),(9,'l','skyblue',50),(9,'m','skyblue',50),(9,'s','skyblue',50),(9,'xs','skyblue',50),(10,'m','tan',30),(11,'m','brown',0),(12,'l','navy',30),(12,'m','navy',30),(12,'s','navy',30),(12,'xl','navy',30);
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
INSERT INTO `wash` VALUES ('0231',NULL),('08',NULL),('11',NULL),('68',NULL),('乾洗',NULL),('水洗',NULL),('請用冷水清洗或送洗',NULL);
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

-- Dump completed on 2020-03-27 21:31:43
