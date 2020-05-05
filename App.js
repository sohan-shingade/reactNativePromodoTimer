import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      min: 5,
      tensec: 0,
      sec: 0,
      timerRunning: false,
      timerText: 'Start Timer',
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.updateTimer = this.timerUpdated.bind(this)
  }
  startTimer(){
    this.state.timerRunning = true
    this.interval = setInterval(
      () => {
        this.setState((prevState)=> ({ 
          min: prevState.min,
          tensec: prevState.tensec, 
          sec: prevState.sec - 1, 
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
    console.log(this.state.timerRunning)
  }
  
  timerUpdated(){
    if (this.state.sec === -1){
      let tempsec = this.state.tensec-1
      if(tempsec === -1){
        let tempmin = this.state.min-1
        if(tempmin === -1){
          this.setState({
            min: 5,
            tensec: 0,
            sec: 0,
            timerRunning: this.state.timerRunning,
            timerText: this.state.timerText
          })
        }
        else{
          this.setState({
            min: tempmin,
            tensec: 5,
            sec: 9,
            timerRunning: this.state.timerRunning,
            timerText: this.state.timerText
          })
        }
      }
      else{
      this.setState({
          min: this.state.min,
          tensec: tempsec,
          sec: 9,
          timerRunning: this.state.timerRunning,
          timerText: this.state.timerText
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
        timerText: 'Start Timer',
      })
      
      this.stopTimer()
    }
    else{
      this.setState({
        min: this.state.min,
        tensec: this.state.tensec,
        timerRunning: true,
        timerText: 'Stop Timer',
      })
      this.startTimer()
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Button title = {this.state.timerText} style = {styles.timerButton} onPress = {() => this.timerCheck()}/>
        <Text style={styles.timerWork}>{this.state.min}:{this.state.tensec}{this.state.sec}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerWork: {
    color: '#ff0000',
    fontSize: 30
  },
  timerButton: {
    alignSelf: 'flex-end'
  }
});
