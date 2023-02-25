import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
//import logo from './logo.svg';
import './App.css';

class App extends Component{
  //first runs
    constructor() {
      super();
      this.state =  {
        monsters:[],
        searchField: ''
        
      };
      console.log('Constructor');
    }
    //runs third menthod, when state gets updated it re renders again
  componentDidMount(){
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=>
         response.json())
         .then((users)=>
          this.setState(
            ()=> {
            return {monsters:users};
            },
          ()=>{
            console.log(this.state);
          }
          
          )
        );
  } 

  onSearchChange=(event)=>{
    console.log(event.target.value);
    const searchField=event.target.value.toLocaleLowerCase();            
    this.setState(()=>{
      return {searchField}
    });
   };
// runs second,when render mounts it runs componentDidMount
    render() {
      console.log('render');
      const { monsters, searchField}=this.state;
      const {onSearchChange}=this;

      const filteredMonsters=monsters.filter((monster)=>{
        return monster.name.toLocaleLowerCase().includes(searchField);
      });
        return (
          <div className="App">
          <h1 className='app-title'>Monsters Rolodex</h1>
           <SearchBox className={'monster-ssearchBox'} onChangeHandler={onSearchChange}
           placeholder={'Search Monster'}/>         
           <CardList monsters={filteredMonsters}/>
          </div> 
        );
    }
  
}

export default App;
