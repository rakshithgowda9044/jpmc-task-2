import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showgraph: boolean, // convert the graph from static table to a live graph
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showgraph: false, //to make sure the graph is displayed only when user clicks on start streaming button
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if(this.state.showgraph == true){ //make sure that graph renders only when showgraph is true
    return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
      let x = 0;
      const interval = setInterval(()=>{   //setInterval is a function which calls this code block 
        DataStreamer.getData((serverResponds: ServerRespond[])=>{  // continuously until a certain
          this.setState({                                          // value is reached,once the value is
             data:serverResponds,                                   // reached we will clear it using clearInterval
            showgraph: true,
          });
        });
        x++;
        if(x>1000){
          clearInterval(interval);
        }
      },1000)

  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
