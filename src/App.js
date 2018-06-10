import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Container, Row, Col, Input } from 'reactstrap';
import debounce from 'lodash/debounce';
import categories from './categories.json'
import { createObjectTree, createHtmlTree, filterNestedObject } from './Utils'
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      filterCategoryList: []
    }
  }

  componentDidMount = () => {
    const objectTree = createObjectTree(categories);
    
    this.setState({
      filterCategoryList: objectTree
    })
  }

  debounceHandleSearch = debounce((searchTerm) => {
    const objectTree = createObjectTree(categories);
    const searchResult = filterNestedObject(objectTree, searchTerm);
    
    this.setState({
      filterCategoryList: searchResult
    })
  }, 100);

  handleSearch = (e) => {
    const searchTerm = e.target.value;
    this.debounceHandleSearch(searchTerm);
  }

  render() {
    const { filterCategoryList } = this.state;
    
    return (
        <Container fluid={true}>
          <Row>
            <Col xs="4" className="sidebar">
              <div>
                <Input type="text" placeholder="Search here"  onChange={this.handleSearch}/>
                <div className="categories">
                  {createHtmlTree(filterCategoryList)}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    );
  }
}


Container.propTypes = {
  fluid:  PropTypes.bool
}

export default App;
