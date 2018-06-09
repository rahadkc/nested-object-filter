import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Container, Row, Col, Input } from 'reactstrap';
import categories from './categories.json'
import lFilter from 'lodash/filter';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      filterlist: categories,
      treeItems: categories,
    }
  }

  componentDidMount = () => {
    const treeList = this.treeList(this.state.treeItems);
    
    this.setState({
      filterlist: treeList
    })
  }

  treeList(data) {
    // Deep clone the list and add a children property with empty array value to each item
    const items = data.map(item => Object.assign({}, item, { children: [] }));
    
    // Organize items into a map keyed by item value for easy lookup
    const byValue = new Map(items.map(item => [item.Id, item]));

    // Top level will contain the items which do not have a parent
    const topLevel = [];
    for (const item of items) {
      // Look up the parent item if there is one
      const parent = byValue.get(item.ParentCategoryId);
      // console.log( parent, 'parenttttt', item.ParentCategoryId);

      if (parent) {
        // Append the item into the parent's children array
        parent.children.push(item);
      } else {
        // The item has no parent
        topLevel.push(item);
      }
    }
    return topLevel;
  }

  searchHandle = (e) => {
    const searchTerm = e.target.value;
    const searchResult = categories.filter(category => {
      return (category.ParentCategoryId === 0 || category.Name.toString().toLowerCase().search(searchTerm.toString().toLowerCase()) !== -1);
    })
    // const i = lFilter(categories, function(item){
    //   return (item.ParentCategoryId === '0' || item.Name.toString().toLowerCase().search(searchTerm.toString().toLowerCase()) !== -1);
    // });
    // const s = this.filterData(searchTerm)
   
    console.log('fffffff', searchResult)
    const treeList = this.treeList(searchResult);
    this.setState({
      filterlist: treeList
    })
  }

  // filterData = (searchTerm) => {
  //   var r = this.state.filterlist.filter(function(o) {
  //     if (o.children && o.children.length > 0) {
  //       this.filterData(searchTerm);
  //     }
  //     return (o.ParentCategoryId === 0 || o.Name.toString().toLowerCase().search(searchTerm.toString().toLowerCase()) !== -1)
  //   })
  //   return r;
  // }
    // json_tree = (data) => {
    //   let json  = "<ul>";
    
    //   for(let i = 0; i < data.length; ++i) {
    //       json =  json + "<li>" + data[i].Name
    //       if(data[i].children) {
    //           json = json + this.json_tree(data[i].children);
    //       }
    //       json = json + "</li>";
    //   }
    //   return json + "</ul>";
    // }

    htmlTree = (cat) => {
      return <ul>
      {cat.map(data => <li key={data.Id}> {data.Name}
          {data.children && data.children.length > 0 && this.htmlTree(data.children)}
          </li>)}
      </ul>;
    }

 
    

   

  render() {
    // const topCategories = categories.filter(category =>  category.ParentCategoryId === 0);
   
    // const topCategoryList = Object.keys(this.state.filterlist).map((category, i) => {
    //   const name = this.state.filterlist[category].Name;
    //   const id = this.state.filterlist[category].ParentCategoryId
    //     return <li key={i} className={id !== 0 ? 'sub' : ''}>{name}</li>;
    // });
    // const treeList = this.treeList();
    // const html = this.json_tree(treeList);
    // console.log(this.state.filterlist, 'kkkkkk');



    
    return (
        <Container fluid={true}>
          <Row>
            <Col xs="4" className="sidebar">
              <div>
                <Input type="text" placeholder="Search here"  onChange={this.searchHandle}/>
                <div className="categories">
                  {/* {topCategoryList} */}
                  {this.htmlTree(this.state.filterlist)}
                </div>
              </div>
            </Col>
          </Row>

        {/* <div className="search-box">
            <input type="text" placeholder="search here" className="search" onChange={this.searchHandle}/>

            <ul className="categories">
              {topCategoryList}
            </ul>
        </div> */}
        </Container>

    );
  }
}


Container.propTypes = {
  fluid:  PropTypes.bool
  // applies .container-fluid class
}

export default App;
