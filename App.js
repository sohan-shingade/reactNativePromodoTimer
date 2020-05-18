import React from 'react';
import { StyleSheet, Text, View, Button, Sep, TouchableOpacity, Dimensions } from 'react-native';

const CustomButton = props => {
  return(
    <TouchableOpacity onPress = {props.onPress} style = {styles.startButton}>
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
      worknumberString: 1 % 5 + '/4'
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.updateTimer = this.timerUpdated.bind(this)
    this.timerCheck = this.timerCheck.bind(this)
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
          worknumberString: this.state.worknumber % 5 + '/4'

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
          if(this.state.work){
            newmin = 5
            worktitletemp = 'Take a Break :)'

            if(this.state.worknumber % 5 == 0){
              //long break
              newmin = 10
              worktitletemp = 'Take a long break. You deserve it'
              workString = ''
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
              worknumberString: this.state.worknumber % 5 + '/4'

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
            worknumberString: this.state.worknumber % 5 + '/4'

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
            worknumberString: this.state.worknumber % 5 + '/4'


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
          worknumberString: this.state.worknumber % 5 + '/4'


      })
    }
    }
  }
  
  /*componentWillUnmount(){
   clearInterval(this.interval);
  }*/
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
        worknumberString: this.state.worknumber % 5 + '/4'

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
        worknumberString: this.state.worknumber % 5 + '/4'


      })
      this.startTimer()
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.RectCont}>
          <View style = {styles.Rectangle1}></View>
          <View style = {styles.Rectangle2}></View>
          <View style = {styles.Rectangle3}></View>
        </View>
        <CustomButton onPress = {() => this.timerCheck()} text = {this.state.timerText}/>

        <View style = {styles.timerCont}>
          <View style = {styles.CircleShapeView}>
            <View style = {styles.capsule}>
              <Text style={styles.timerWork}>{this.state.min}:{this.state.tensec}{this.state.sec}</Text>
              <Text style={styles.worksCount}>{this.state.worknumberString}</Text>

            </View>

          </View>
         
        
        </View>
        <Text style = {styles.titleText}>{this.state.workBreakText}</Text>

        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCont:{
    alignSelf: 'center',
    position: 'absolute',
  },
  button: {
    alignSelf: 'center',
  },
  startButton: {
    top: -100,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#6500FF',
    fontFamily: 'Futura',
    fontSize: 35,
    alignSelf: 'center',
  },
  timerWork: {
    width: 223,
    height: 75,
    top:-7,
    alignSelf: 'center',

    color: '#6500FF',
    fontSize: 60,
    fontFamily: 'Futura',
    fontStyle: 'normal',
    textAlign: 'center',

  },
  titleText:{
    fontFamily: 'Futura',
    fontSize: 45,
    alignSelf:'center',
    color: '#792BF0',
    width: 308,
    height: 120,
    alignSelf: "center",
    textAlign: 'center',
  },
  timelengthsText: {
    color: '#FFF600',
    fontSize: 12,
  },
  worksCount: {
    color:'#6500FF',
    fontSize: 25,
    fontFamily: 'Futura',
    alignSelf: "center",
    position: 'absolute',
    top: 120,
  },
  RectCont: {
    flex: 1,
    width: Dimensions.get('window').width,
    top: (Dimensions.get('window').height/13),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  Rectangle1: {
    /*
    width: 75,
    height: 80,
    right: 307,
    top: 75,
    */
    backgroundColor: '#6500FF',
    borderRadius: 14,
    width: 75,
    height: 80,
  },
  
  Rectangle2: {
    /*
    height: 80,
    right: 170,
    top: 75,
    */
    backgroundColor: '#6500FF',
    borderRadius: 14,
    width: 75,
    height: 80,
  },
  Rectangle3: {
    /*
    right: 32,
    top: 75,
    */
    backgroundColor: '#6500FF',
    borderRadius: 14,
    width: 75,
    height: 80,
  },
  CircleShapeView: {
    alignSelf: 'center',
    
    width: (Dimensions.get('screen').width/1.3),
    height: (Dimensions.get('screen').width/1.3),
    borderRadius: (Dimensions.get('screen').width/(1.3*2)),
    borderColor: '#792BF0',
    borderWidth: 10,
    backgroundColor: '#ffffff00',
    
  },
  capsule: {
    alignSelf: 'center',
    width: 230,
    height: 85,
    top: 60,
    borderRadius: 50,
    borderColor: '#792BF0',
    borderWidth: 10,
    backgroundColor: '#ffffff00',

  },
  
});
