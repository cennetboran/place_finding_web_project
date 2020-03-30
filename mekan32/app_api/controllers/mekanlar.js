const mongoose=require('mongoose');
const Mekan=mongoose.model('mekan');
const cevapOlustur = function (res,status,content) {
	res
		.status(status)
		.json(content);
};
const mekanlariListele= async (req,res)  =>{
	var boylam= parseFloat(req.query.boylam);
	var enlem = parseFloat(req.query.enlem);
	var konum = {
		type: "point",
		coordinates: [enlem,boylam]
		
	};
	if (!enlem || !boylam) {
		cevapOlustur(res, 404, { "mesaj": "enlem ve boylam zorunlu"});
		return;
	}
	try{
	const sonuclar=await Mekan.aggregate([
	{
		$geoNear:{
			near:konum,
			distanceField:"mesafe",
			key:"koordinatlar",
			spherical: true,
			maxDistance: 20000,
			limit:10
		}
	}
	]);
	const mekanlar =sonuclar.map(sonuc=>{
		return {
			id:sonuc._id,
			ad:sonuc.ad,
			adres:sonuc.adres,
			puan:sonuc.puan,
			imkanlar:sonuc.imkanlar,
			mesafe: sonuc.mesafe.toFixed()+'m'
	} });
	cevapOlustur (res, 200, mekanlar);
	}catch(hata){
	cevapOlustur(res,404,hata); 
	}
}
const mekanEkle= function (req, res) {
		Mekan.create({
			ad: req.body.ad,
			adres: req.body.adres,
			imkanlar: req.body.imkanlar.split(","),
			koordinatlar: [parseFloat(req.body.enlem), parseFloat(req.body.boylam)],
			saatler: [
			{
				gunler: req.body.gunler1,
				acilis: req.body.acilis1,
				kapanis: req.body.kapanis1,
				kapali: req.body.kapali1,
			},	{
				gunler: req.body.gunler2,
				acilis: req.body.acilis2,
				kapanis: req.body.kapanis2,
				kapali: req.body.kapali2,
			}]
		},	function(hata, mekan) {
				if (hata) {
					cevapOlustur (res, 400, hata);
				} else {
					cevapOlustur (res, 201, mekan);
				}
			});
		};
const mekanGetir= function (req,res) {
	Mekan.findById(req.params.mekanid)
	.exec(
	function(hata,mekan){
	cevapOlustur(res,200,mekan);
	}
	);
}
const mekanGuncelle= function (req,res) {
	if (!req.params.mekanid) {
		cevapOlustur(res, 404, {"mesaj": "Bulunamadı. mekanid gerekli"});
		return;
	}
		Mekan
		.findById(req.params.mekanid)
		//- işaretli yorumlar ve puan dışında herşeyi almamızı söyler
		.select('-yorumlar -puan')
		.exec(
			function(hata, gelenMekan){
				if (!gelenMekan) {
					cevapOlustur(res, 404, {"mesaj": "mekanid bulunamadı"});
					return;
				} else if (hata) {
					cevapOlustur(res, 400, hata);
					return;
				}
					gelenMekan.ad = req.body.ad;
					gelenMekan.adres = req.body.adres;
					gelenMekan.imkanlar = req.body.imkanlar.split(",");
					gelenMekan.koordinatlar = [parseFloat(req.body.enlem),parseFloat(req.body.boylam)];
					gelenMekan.saatler = [{
						gunler: req.body.gunler1,
						acilis: req.body.acilis1,
						kapanis: req.body.kapanis1,
						kapali: req.body.kapali1,
					}, {
						gunler: req.body.gunler2,
						acilis: req.body.acilis2,
						kapanis: req.body.kapanis2,
						kapali: req.body.kapali2,
					}];
					gelenMekan.save(function(hata, mekan) {
						if (hata) {
							cevapOlustur(res, 404, hata);
						} else {
							cevapOlustur(res, 200, mekan);
						}
					});
				});
		}
const mekanSil= function (req,res) {
	var mekanid = req.params.mekanid;
	if (mekanid) {
		Mekan
		.findByIdAndRemove(mekanid)
		.exec(
			function(hata, gelenMekan) {
				if (hata) {
					cevapOlustur(res, 404, hata);
					return;
				}
					cevapOlustur(res, 204, null);
			}
			);
	} else {
		cevapOlustur(res, 404, {"mesaj": "mekanid bulunamadı"
		}); }
	};
module.exports = {
	mekanlariListele,
	mekanEkle,
	mekanGetir,
	mekanGuncelle,
	mekanSil
};