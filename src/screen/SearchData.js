import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import { Item, Input, Header, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import * as actionList from '../redux/actions/actionList';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// eslint-disable-next-line no-mixed-operators
const height2 = height * 91 / 100;

class SearchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSeacrh: '',
      limit: 10,
      loading: false
    };
  }


  // eslint-disable-next-line no-undef
  getDataSearch = async () => {
    const params = {
      token: 'Bearer XmmjoU7dseJOgM9w7LSax97bn2DqiWRY0UpYDC3Y4eaeSzmt0CST9DWhLOI4GE0hZFAB2DnWraM3QffwBQQgtCRnfZ9RHNIlPVveU_2GFUQwrGQ3bSzjyzCZqwDiXXYx',
      search: this.state.dataSeacrh,
      limit: this.state.limit
    };
    this.props.getSearch(params);
    this.setState({ loading: false });
  }

  async handleMore() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ limit: this.state.limit + 10, loading: false }, this.getDataSearch);
    }, 2000);
  }

  async handleBack() {
    this.props.navigation.goBack();
  }

  renderFooter() {
    if (this.state.loading === true) {
      return (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <ActivityIndicator size='small' size='large' color='#979797' />
        </View>
      );
    }
    return null;
  }

  renderAll(item) {
    return (
      <View style={styles.contentStyle}>
        <TouchableOpacity
          style={{ height: '70%', paddingTop: '7%' }}
          onPress={() => this.props.navigation.navigate(
            'Details', { name: item.name, id: item.id, review: item.review_count, rating: item.rating, phone: item.display_phone }
          )}
        >
          <Image source={{ uri: item.image_url }} style={styles.imageStyle} />
        </TouchableOpacity>
        <View style={{ width: '90%', paddingLeft: '7%' }}>
          <Text numberOfLines={1} style={styles.listTitleStyle}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.listTextStyle}>
            {item.categories.map(e => e.title).join(', ')}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='star' size={15} color='gold' style={{ marginRight: '3%' }} />
            <Text numberOfLines={1} style={styles.listTextStyle}>{item.rating}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Header style={{ backgroundColor: '#3a9679' }} androidStatusBarColor='#3a9679'>
            <Body style={styles.headerBodyStyle}>
              <Item regular style={styles.containSearchStyle}>
                <Input
                  style={styles.searchStyle}
                  placeholder='Search'
                  returnKeyType='search'
                  onChangeText={(text) => this.setState({ dataSeacrh: text })}
                  onSubmitEditing={this.getDataSearch}
                />
              </Item>
            </Body>
            <Right style={styles.headerRightStyle}>
              <Text style={styles.headerRightTextStyle} onPress={() => this.handleBack()}>
                Cancel
              </Text>
            </Right>
          </Header>
        </View>

        <FlatList
          data={this.props.dataList.search.businesses}
          renderItem={({ item }) => this.renderAll(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReached={() => this.handleMore()}
          onEndReachedThreshold={0}
          ListFooterComponent={() => this.renderFooter()}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    dataList: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSearch: (params) => dispatch(actionList.handleSearchList(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchData);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerBodyStyle: {
    flex: 10,
  },
  headerRightStyle: {
    flex: 2,
    paddingRight: '2%',
    marginLeft: '2%'
  },
  headerRightTextStyle: {
    fontFamily: 'Raleway-Medium',
    color: '#fbf9fa',
    fontSize: 14
  },
  containSearchStyle: {
    marginTop: 15,
    borderColor: '#fbf9fa',
    paddingRight: 20,
    borderRadius: 5,
    backgroundColor: '#fbf9fa',
    marginBottom: 15,
    borderWidth: 3,
    height: 42
  },
  searchStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Raleway-Regular'
  },
  contentStyle: {
    //flex: 1,
    width: width / 2,
    height: height2 / 3,
  },
  imageStyle: {
    height: '100%',
    width: null,
    borderRadius: 5,
    marginHorizontal: '4%',
  },
  listTitleStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  listTextStyle: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: '#5f6769',
    marginRight: '2%'
  },
  priceStyle: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: '#5f6769',
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
