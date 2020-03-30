const anaSayfa=function(req,res){
	res.render('mekanlar-liste',
		{'baslik':'Anasayfa',
		'sayfaBaslik':{
			'siteAd':'Mekan32',
			'aciklama':'Isparta civarındaki mekanları keşfedin!'
		},
		'mekanlar':[
		{
			'ad':'Starbucks',
			'adres':'Centrum Garden',
			'puan':3,
			'imkanlar':['kahve','çay','pasta'],
			'mesafe':'10km'
		},
		{
			'ad':'Gloria Jeans',
			'adres':'Iyas AVM',
			'puan':'2',
			'imkanlar':['kahve','kek','çay'],
			'mesafe':'5km'
		}
		]
		}
		);
}





const mekanBilgisi=function(req,res){
	res.render('mekan-detay',{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik':'starbucks',
		'mekanBilgisi':{
			'ad':'Starbucks',
			'adres':'Centrum Garden' ,
			'puan':3,
			'imkanlar':['Kahve','Pasta','Kek'],
			'koordinatlar':{
				'enlem':37.781885,
				'boylam':30.566034
			},
			'saatler':[
				{
					'gunler':'Pazartesi-Cuma',
					'acilis':'7:00',
					'kapanis':'23:00',
					'kapali':false	  
				},
				{
					'gunler':'Cumartesi',
					'acilis':'9:00',
					'kapanis':'22:30',
					'kapali':false
				},
				{
					'gunler':'Pazar',
					'kapali':true
				}
			],
			'yorumlar':[
				{
					'yorumYapan':'asım Sinan Yüksel',
					'puan':3,
					'tarih':'18 Ekim 2017',
					'yorumMetni':'kahveler çok güzel'
				}
			]
		}
	});
}


const yorumEkle=function(req,res){
	res.render('yorum-ekle',{'title':'Yorum Ekle'});
}

module.exports={
	anaSayfa,
	mekanBilgisi,
    yorumEkle
	};
	