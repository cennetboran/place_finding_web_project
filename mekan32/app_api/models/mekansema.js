var mongoose = require( 'mongoose' ); 
//Mekanın açılış kapanış saatlerini tutacak şema
var saatSema = new mongoose.Schema(
    { 
        gunler:{type:String,required:true},
        acilis:String,
        kapanis:String,
        kapali:{type:Boolean,required:true}
    },
    {usePushEach: true}
    ); 
//Yorumların tutulacağı şema
var yorumSema = new mongoose.Schema(
    { 
        yorumYapan:{type:String,required:true},
        puan:{type:Number,required:true,min:0,max:5},
        yorumMetni:{type:String,required:true},
        tarih:{type:Date,default:Date.now}
    },
    {usePushEach: true}
    ); 
//Mekan bilgilerinin tutulacağı şema
var mekanSema = new mongoose.Schema(
    { 
        ad:{type:String,required:true},
        adres:String,
        puan:{type:Number, default:0,min:0,max:5},
        imkanlar:[String],
        koordinatlar:{type:[Number],index:'2dsphere'},
        saatler:[saatSema],
        yorumlar:[yorumSema]
    },{usePushEach: true}
    ); 
//Şemayı derle ve model oluştur. mekan doküman adı, mekanlar koleksiyon adı
mongoose.model('mekan',mekanSema,'mekanlar');