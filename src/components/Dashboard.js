import React, { Component } from 'react';
<<<<<<< HEAD
import { View, Text,TouchableOpacity, ActivityIndicator, StyleSheet,Image} from 'react-native';
=======
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
>>>>>>> 6e0768846232b6cf6e71de91038a915ad75a2999
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCovid_19List } from '../redux/actions/CovidInfo';
import AppImages from '../assets/images';
import LinearGradient from 'react-native-linear-gradient';



class Dashboard extends Component {

    componentDidMount() {
    this.props.fetchCovid_19List();
    }


    onPress = () => {
        this.props.navigation.navigate('MapView')
    }

    render() {
        console.log(this.props.covidInfo.confirmed)
       let DATA = [
            {
                id:1,
                headerText:'CONFIRMED CASES',
                subText: this.props.covidInfo.confirmed,
                imageIcon:AppImages.earth_image,
                colorOne:'#EA674B',
                colorTwo:'#FF0202',   
            },
            {
                headerText:'RECOVERED CASES',
                subText: this.props.covidInfo.recovered,
                colorOne:'#3890DA',
                colorTwo:'#085BB8'
            },
            {
                id:3,
                headerText:'TOTAL DEATHS',
                subText: this.props.covidInfo.deaths,
                colorOne:'#805CEC',
                colorTwo:'#4D1EB5'
            }
        ] 
        switch (this.props.covidInfo.isFetching) {
            case true:
                return <View style={styles.viewParent}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                console.log("Response:" + JSON.stringify(this.props.covidInfo))
                return (
                    <View style={styles.viewParent} >
                        <View style={styles.firstContainer}> 
                            <Image resizeMode={'contain'} source={AppImages.icon_image} style = {{height:80 , width:80}} />
                            <Text style={[styles.headerText]}>
                                {'COVID-19 Global Cases'}
                            </Text>
                        </View>
                    
                    {DATA.map(item=>{
                        return(
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[ item.colorOne, item.colorTwo]} style={[styles.infoCard]} >
                            <TouchableOpacity style={{flexDirection:"row"}}> 
                                    <View style={styles.textContainer}> 
                                        <Text style={styles.headerCardText}>{item.headerText}</Text>
                                        <Text style={styles.subText} >{item.subText}</Text>
                                    </View>
                                    <View style={{flex:1.5,alignItems:'flex-end',justifyContent:'center'}}>
                                        <Image source={item.imageIcon} style={{height:80, width:80 }}/>
                                    </View>
                                </TouchableOpacity> 
                        </LinearGradient>    
                            )
                    })}
                    
            </View>
                            )
        }
    }
}

function mapStateToProps(state) {
    return {
        covidInfo: state.covid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCovid_19List }, dispatch)
    }
}

const styles = StyleSheet.create({
viewParent: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffff',
    // marginHorizontal:10,
},
      
firstContainer:{
    marginHorizontal:10,
    marginTop:60,
    flex:0.1,
    flexDirection:'row',
    marginBottom:30,

},
headerText:{
  padding:18,
  fontSize:22,
},
infoCard:{
  marginHorizontal:15,
  marginVertical:10 ,
  paddingHorizontal:15,
  borderRadius:10,
  alignItems:"center",
  flex:0.2,
  shadowColor: '#939393',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      elevation:0.9,
      shadowOpacity: 0.8,
},
textContainer:{
  paddingHorizontal:5,
  paddingVertical:20
},
headerCardText:{
  fontSize:25,
  color:'#ffff'
},
subText:{
  fontSize:55,
  paddingTop:20,
  paddingLeft:10,
  color:'#ffff'
}
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)