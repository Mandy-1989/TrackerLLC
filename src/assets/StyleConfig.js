import {Dimensions, Platform, NativeModules, PixelRatio} from 'react-native';
var RNDeviceInfo = NativeModules.RNDeviceInfo;
const {width,height} = Dimensions.get('window');
const isIphone = Platform.OS === "ios"
const deviceType = width < 480 ? 'phone' : 'tablet';
const iPhoneX = (isIphone && height === 812) || (isIphone && height === 896);
const widthPer = width /100 ;
const heightPer = height /100 ;
const screen_unused_height = isIphone ? iPhoneX ? 78 : 28 :  24 ;
const screen_height = height -screen_unused_height ;
const ratioCount = screen_height / 667; //smartScale
const isTablet=()=> {
    if ( isIphone ){
        return Platform.isPad ;
    }else {
        return (height/width) <= 1.6
    }
}
const APP_FONTS = {
    LATO_LIGHT: isIphone ? "Lato-Light" : 'lato_light',
    LATO_REGULAR: isIphone ? "Lato-Regular" : 'lato_regular',
    LATO_MEDIUM: isIphone ? "Lato-Medium" : 'lato_medium',
    LATO_BOLD: isIphone ? "Lato-Bold" : "lato_bold",
    LATO_ITALIC: isIphone ? "Lato-Italic" : 'lato_italic',

    ALLER_REGULAR: isIphone ? "Aller" : "Aller_Rg",
    ALLER_BOLD_ITALIC: isIphone ? "Aller-BoldItalic" : "Aller_BdIt",
    ALLER_ITALIC: isIphone ? "Aller-Italic" : "Aller_It",
    ALLER_LIGHT: isIphone ? "Aller-Light" : "Aller_Lt",
    ALLER_LIGHT_ITALIC: isIphone ? "Aller-LightItalic" : "Aller_LtIt",
    ALLER_BOLD: isIphone ? "Aller-Bold" : "Aller",

}
export default {
    countPixelRatio:(size) => size * ratioCount ,
    responsiveHeight: (size) => size * heightPer ,
    responsiveWidth: (size) => size * widthPer ,
    fontSizeH1: ((deviceType == 'phone') ? 26 : 36) * ratioCount,
    fontSizeH1_2: ((deviceType == 'phone') ? 24 : 33) * ratioCount,
    fontSizeH2: ((deviceType == 'phone') ? 20 : 26)* ratioCount,
    fontSizeH2_3: ((deviceType == 'phone') ? 18 : 22)* ratioCount,
    fontSizeH3: ((deviceType == 'phone') ? 15 : 18)* ratioCount,
    fontSizeH3_4: ((deviceType == 'phone') ? 12 : 15)* ratioCount,
    fontSizeH4: ((deviceType == 'phone') ? 10 : 12)* ratioCount,
    fontSizeH5: ((deviceType == 'phone') ? 8 : 10)* ratioCount,
    fontSizeParagraph: ((deviceType == 'phone') ? 13 : 15)* ratioCount,
    getFont:(type)=>{
        switch (type) {
            case "light":
                return APP_FONTS.ALLER_LIGHT
            case "regular":
                return APP_FONTS.ALLER_REGULAR
            case "medium":
                return APP_FONTS.ALLER_REGULAR
            case "bold":
                return APP_FONTS.ALLER_BOLD
            case "italic":
                return APP_FONTS.ALLER_ITALIC
            default:
                return APP_FONTS.ALLER_REGULAR
        }
    },
    fontLight: APP_FONTS.LATO_LIGHT,
    fontRegular: APP_FONTS.LATO_REGULAR,
    fontMedium: APP_FONTS.LATO_MEDIUM,
    fontBold: APP_FONTS.LATO_BOLD,
    fontItalic: APP_FONTS.LATO_ITALIC,
    iPhoneX,
    width,
    height,
    isPhone: !isTablet(),
    isTab: isTablet(),
    isIphone,
    COLOR:{
        THEME:'#0093BA',
        WHITE:'#FFFFFF',
        BLACK:'#000',
        RED:'#D00',
        GREY:'#4D4D4D',
        TURQUOISE:'#59C6C3',
        CYAN:'#00aeef',
        GREY_DIM:'#707070',
        GREY_LIGHT:'#D3D3D3',
        SILVER:'#C0C0C0',
        TURQUOISE_LIGHT:'#ECFAFA',
        DARK_ORANGE:'#fd7e14'
    }
}
