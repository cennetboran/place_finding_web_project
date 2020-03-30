var express = require('express');
var router = express.Router();

var ctrlmekanlar=require('../controllers/mekanlar');
var ctrldigerleri=require('../controllers/digerleri');


router.get('/',ctrlmekanlar.anaSayfa);

router.get('/mekan',ctrlmekanlar.mekanBilgisi);
router.get('/mekan/yorum/yeni',ctrlmekanlar.yorumEkle);
router.get('/hakkinda',ctrldigerleri.hakkinda)
module.exports=router;