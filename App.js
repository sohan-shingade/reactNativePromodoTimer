import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, TextInput } from 'react-native';

const CustomButton = props => {
  return(
    <TouchableOpacity onPress = {props.onPress} style = {styles.startButton}>
      <View style = {{...styles.button, ...props.style}}>
        <Text style = {{...styles.buttonText, ...props.style}}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}
const ResetButton = props => {
  return(
    <TouchableOpacity onPress = {props.onPress} style = {styles.resetButton}>
      <View style = {{...styles.button, ...props.style}}>
        <Text style = {{...styles.buttonText, ...props.style}}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      min: 25,
      tensec: 0,
      sec: 0,
      timerRunning: false,
      timerText: 'Start',
      work: true,
      workBreakText: 'Let\'s do some \nwork!',
      worknumber: 1,
      worknumberString: 1 % 5 + '/4',
      backgroundColor: '#FFF600',   
      timerColor: '#792BF0',
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.updateTimer = this.timerUpdated.bind(this)
    this.timerCheck = this.timerCheck.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer(){
    this.state.timerRunning = true
    this.interval = setInterval(
      () => {
        this.setState((prevState)=> ({ 
          min: prevState.min,
          tensec: prevState.tensec, 
          sec: prevState.sec - 1, 
          work: prevState.work,
          workBreakText: prevState.workBreakText,
          worknumber: prevState.worknumber,
          worknumberString: this.state.worknumber % 5 + '/4',
          backgroundColor: this.state.backgroundColor,
          
          timerColor: this.state.timerColor,


        }))
        this.timerUpdated()
      }
        ,
      1000
    );
  }

  stopTimer(){
    this.timerRunning = false
    clearInterval(this.interval)
  }
  componentDidUpdate(){
  }
  
  timerUpdated(){
    if (this.state.sec === -1){
      let tempsec = this.state.tensec-1
      if(tempsec === -1){
        let tempmin = this.state.min-1
        if(tempmin === -1){
          let newmin = 0
          let worktitletemp = 'Let\'s do some \nwork!'
          let workString = this.state.worknumber % 5
          let tempBackColor = '#FFF600'
          let temptimercolor = '#792BF0'
          if(this.state.work){
            newmin = 5
            worktitletemp = 'Take a Break :)'
            tempBackColor = '#792BF0'
            temptimercolor = '#FFF600'

            if(this.state.worknumber % 4 == 0){
              //long break
              newmin = 10
              worktitletemp = 'Take a long break. You deserve it'
              workString = ''
              tempBackColor = '#01F0FF'
              temptimercolor = '#FF564B'
            }

          }
          else{
            newmin = 25
            worktitletemp = 'Let\'s do some \nwork!'
            this.setState({
              min: this.state.min,
              tensec: this.state.tensec,
              sec: this.state.sec,
              timerRunning: this.state.timerRunning,
              timerText: this.state.timerText,
              work: this.state.work,
              workBreakText: worktitletemp,
              worknumber: this.state.worknumber + 1,
              worknumberString: this.state.worknumber % 5 + '/4',
              backgroundColor: tempBackColor,
              timerColor: temptimercolor,

            })
          }
          this.setState({
            min: newmin,
            tensec: 0,
            sec: 0,
            timerRunning: this.state.timerRunning,
            timerText: this.state.timerText,
            work: !this.state.work,
            workBreakText: worktitletemp,
            worknumber: this.state.worknumber,
            worknumberString: this.state.worknumber % 5 + '/4',
            backgroundColor: tempBackColor,
            timerColor: temptimercolor,

          })
        }
        else{
          this.setState({
            min: tempmin,
            tensec: 5,
            sec: 9,
            timerRunning: this.state.timerRunning,
            timerText: this.state.timerText,
            work: this.state.work,
            workBreakText: this.state.workBreakText,
            worknumber: this.state.worknumber,
            worknumberString: this.state.worknumber % 5 + '/4',
            backgroundColor: this.state.backgroundColor,
            timerColor: this.state.timerColor,


          })
        }
      }
      else{
      this.setState({
          min: this.state.min,
          tensec: tempsec,
          sec: 9,
          timerRunning: this.state.timerRunning,
          timerText: this.state.timerText,
          work: this.state.work,
          workBreakText: this.state.workBreakText,
          worknumber: this.state.worknumber,
          worknumberString: this.state.worknumber % 5 + '/4',
          backgroundColor: this.state.backgroundColor,
          timerColor: this.state.timerColor,


      })
    }
    }
  }
  
  /*componentWillUnmount(){
   clearInterval(this.interval);
  }*/

  resetTimer(){
    this.stopTimer()
    this.setState({
      min: 25,
      tensec: 0,
      sec: 0,
      timerRunning: false,
      timerText: 'Start',
      work: true,
      workBreakText: 'Let\'s do some \nwork!',
      worknumber: 1,
      worknumberString: 1 % 5 + '/4',
      backgroundColor: '#FFF600',
      timerColor: '#792BF0',
    })
  }


  timerCheck(){
    
    if(this.state.timerRunning){
      this.setState({
        min: this.state.min,
        tensec: this.state.tensec,
        timerRunning: false,
        timerText: 'Start',
        work: this.state.work,
        workBreakText: this.state.workBreakText,
        worknumber: this.state.worknumber,
        worknumberString: this.state.worknumber % 5 + '/4',
        backgroundColor: this.state.backgroundColor,
        timerColor: this.state.timerColor,

      })
      
      this.stopTimer()
    }
    else{
      this.setState({
        min: this.state.min,
        tensec: this.state.tensec,
        timerRunning: true,
        timerText: 'Stop',
        work: this.state.work,
        workBreakText: this.state.workBreakText,
        worknumber: this.state.worknumber,
        worknumberString: this.state.worknumber % 5 + '/4',
        backgroundColor: this.state.backgroundColor,
        timerColor: this.state.timerColor,

      })
      this.startTimer()
    }
  }
  
  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
        
        <View style = {styles.RectCont}>
          <View style = {[styles.Rectangle, {backgroundColor: this.state.timerColor}]}>
            <Text style = {[styles.rectText, {color: this.state.backgroundColor}]}>25</Text>
            <Text style = {[styles.minText, {color: this.state.backgroundColor}]}>Min</Text>
            <Text style = {[styles.RectTextLables, {color: this.state.timerColor}]}>Work Time</Text>
          </View>
          <View style = {[styles.Rectangle, {backgroundColor: this.state.timerColor}]}>
            <Text style = {[styles.rectText, {color: this.state.backgroundColor}]}>5</Text>
            <Text style = {[styles.minText, {color: this.state.backgroundColor}]}>Min</Text>
            <Text style = {[styles.RectTextLables, {color: this.state.timerColor}]}>Break Time</Text>

          </View>
          <View style = {[styles.Rectangle, , {backgroundColor: this.state.timerColor}]}>
            <Text style = {[styles.rectText, {color: this.state.backgroundColor}]}>10</Text>
            <Text style = {[styles.minText, {color: this.state.backgroundColor}]}>Min</Text>
            <Text style = {[styles.longBreakRectLabel, {color: this.state.timerColor}]}>Long Break Time</Text>


          </View>
        </View>
        <CustomButton onPress = {() => this.timerCheck()} text = {this.state.timerText} style = {{color: this.state.timerColor}}/>

        <View style = {styles.timerCont}>
          <View style = {[styles.CircleShapeView, {borderColor: this.state.timerColor}]}>
            <View /*style = {styles.capsule}*/>
              <Text style={[styles.timerWork, {color: this.state.timerColor}]}>{this.state.min}:{this.state.tensec}{this.state.sec}</Text>
              <Text style={[styles.worksCount, {color: this.state.timerColor}]}>{this.state.worknumberString}</Text>

            </View>

          </View>
          
         
        
        </View>

        <ResetButton onPress = {()=> this.resetTimer()} text = 'Reset' style = {{color: this.state.timerColor}}/>
        <View style = {styles.titleTextCont}>
          <Text style = {[styles.titleText, {color: this.state.timerColor}]}>{this.state.workBreakText}</Text>
        </View>
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton:{
    position:'absolute',
    top: (Dimensions.get('screen').height/(3/2)),
    alignSelf: 'flex-start',
    paddingLeft: Dimensions.get('window').width/13,
    
  },
  rectText:{
    fontFamily: 'Futura', 
    fontSize:30,
    position: 'absolute'

  },
  RectTextLables: {
    position:'absolute',
    bottom: -25,
    fontFamily: 'Futura', 
    fontSize: 15,

  },
  timerCont:{
    alignSelf: 'center',
    position: 'absolute',
  },
  button: {
    alignSelf: 'center',
  },
  startButton: {
    position: 'absolute',
    top: Dimensions.get('screen').height/3.5,
    alignSelf: 'flex-end',
    paddingRight: (Dimensions.get('window').width/13)
  },
  buttonText: {
    fontFamily: 'Futura',
    fontSize: 35,
    alignSelf: 'center',
  },
  longBreakRectLabel:{
    position:'absolute',
    bottom: -45,
    fontFamily: 'Futura', 
    fontSize: 15,
    textAlign: 'center',
  },
  timerWork: {
    width: 223,
    height: 75,
    top: 55,
    alignSelf: 'center',

    fontSize: 60,
    fontFamily: 'Futura',
    fontStyle: 'normal',
    textAlign: 'center',

  },
  titleTextCont:{
    paddingBottom: Dimensions.get('screen').height/20,
  },
  titleText:{
    fontFamily: 'Futura',
    fontSize: 40,
    alignSelf:'center',
    alignSelf: "center",
    textAlign: 'center',
  },
  timelengthsText: {
    fontSize: 12,
  },
  minText:{
    position: 'absolute',
    fontFamily: 'Futura',
    fontSize: 12,
    bottom: 5,
  },
  worksCount: {
    fontSize: 25,
    fontFamily: 'Futura',
    alignSelf: "center",
    position: 'absolute',
    top: 120,
    paddingTop: Dimensions.get('screen').height/18,
  },
  RectCont: {
    flex: 1,
    width: Dimensions.get('window').width,
    top: (Dimensions.get('window').height/13),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  Rectangle: {
    /*
    width: 75,
    height: 80,
    right: 307,
    top: 75,
    */
    borderRadius: 14,
    width: (Dimensions.get('screen').width/5.5),
    height: (Dimensions.get('screen').width/5.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  
  CircleShapeView: {
    alignSelf: 'center',
    
    width: (Dimensions.get('screen').width/1.5),
    height: (Dimensions.get('screen').width/1.5),
    borderRadius: (Dimensions.get('screen').width/(1.3*2)),
    borderWidth: 10,
    backgroundColor: '#ffffff00',
    
  },
  capsule: {
    alignSelf: 'center',
    width: 230,
    height: 85,
    top: 60,
    borderRadius: 50,
    borderWidth: 10,
    backgroundColor: '#ffffff00',

  },
  
});
