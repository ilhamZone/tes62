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
import { Header, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import * as actionList from '../redux/actions/actionList';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// eslint-disable-next-line no-mixed-operators
const height2 = height * 91 / 100;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      loading: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.getData();
  }

  // eslint-disable-next-line no-undef
  getData = async () => {
    const params = {
      token: 'Bearer XmmjoU7dseJOgM9w7LSax97bn2DqiWRY0UpYDC3Y4eaeSzmt0CST9DWhLOI4GE0hZFAB2DnWraM3QffwBQQgtCRnfZ9RHNIlPVveU_2GFUQwrGQ3bSzjyzCZqwDiXXYx',
      limit: this.state.limit
    };
    this.props.getList(params);
  }

  async handleMore() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ limit: this.state.limit + 10, loading: false }, this.getData);
    }, 2500);
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
    console.disableYellowBox = true;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Header style={{ backgroundColor: '#3a9679' }} androidStatusBarColor='#3a9679'>
            <Left style={styles.headerLeft}><Text style={styles.headerLeftText}>Everything is Here</Text></Left>
            <Right style={styles.headerBodyStyle}>
              <Icons name='search' color='#fbf9fa' size={25} onPress={() => this.props.navigation.navigate('SearchData')} />
            </Right>
          </Header>
        </View>

        <FlatList
          data={this.props.dataList.list.businesses}
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
    getList: (params) => dispatch(actionList.handleGetList(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerBodyStyle: {
    flex: 2,
    paddingRight: '2%',
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
  },
  headerLeft: {
    flex: 8,
    justifyContent: 'center'
  },
  headerLeftText: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#fbf9fa',
    marginLeft: '2%',
  }
});
