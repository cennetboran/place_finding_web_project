const anaSayfa=function(req,res){
	res.render('mekanlar-liste',{'title':'Mekan Bilgisi'});
}

const mekanBilgisi=function(req,res){
	res.render('mekan-detay',{'title':'Mekan Bilgisi'});
}

const yorumEkle=function(req,res){
	res.render('yorum-ekle',{'title':'Yorum Ekle'});
}

module.exports={
	anaSayfa,
	mekanBilgisi,
    yorumEkle
	};