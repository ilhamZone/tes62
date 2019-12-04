import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, FlatList, ActivityIndicator } from 'react-native';
import { Card, CardItem } from 'native-base';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import Slideshow from 'react-native-image-slider-show';
import Icon from 'react-native-vector-icons/Fontisto';
import * as actionList from '../redux/actions/actionList';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id'),
      name: this.props.navigation.getParam('name'),
      rating: this.props.navigation.getParam('rating'),
      review: this.props.navigation.getParam('review'),
      phone: this.props.navigation.getParam('phone'),
      open: '',
      close: '',
      address: '',
      position: 1,
      interval: null,
      iconPrice: [],
      dataSource: [],
    };
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2500)
    });
  }

  async componentDidMount() {
    await this.getData();
    const data = await {
      price: this.props.dataDetail.detail.price,
      open: this.props.dataDetail.detail.hours[0].open[0].start,
      close: this.props.dataDetail.detail.hours[0].open[0].end,
      photos: this.props.dataDetail.detail.photos,
      address: this.props.dataDetail.detail.location.display_address,
    };
    const open1 = data.open.substr(0, 2);
    const open2 = data.open.substr(2, 2);
    const open = `${open1}:${open2}`;

    const close1 = data.close.substr(0, 2);
    const close2 = data.close.substr(2, 2);
    const close = `${close1}:${close2}`;

    const photos = [];
    data.photos.map(e => {
      return photos.push({ url: e });
    });

    const address = data.address.map(e => e).join(' ');
    this.setState({
      open,
      close,
      dataSource: photos,
      address
    });
    this.handlePrice(data.price.length);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  async getData() {
    const params = {
      id: this.state.id,
      token: 'Bearer XmmjoU7dseJOgM9w7LSax97bn2DqiWRY0UpYDC3Y4eaeSzmt0CST9DWhLOI4GE0hZFAB2DnWraM3QffwBQQgtCRnfZ9RHNIlPVveU_2GFUQwrGQ3bSzjyzCZqwDiXXYx'
    };
    await this.props.getDetail(params);
  }

  handlePrice(rating) {
    const countRating = 4;
    const rate = [];
    for (let i = 0; i < countRating; i++) {
      if (i < rating) {
        rate.push(
          <Image
            source={require('../assets/dollargreen.png')}
            style={{ width: 11, height: 10 }}
          />,
        );
      } else {
        rate.push(
          <Image
            source={require('../assets/dollargrey.png')}
            style={{ width: 11, height: 10 }}
          />,
        );
      }
    }
    this.setState({
      iconPrice: [...rate],
    });
  }
  
  renderPrice(item) {
    return <View>{item}</View>;
  }

  render() {
    if (this.props.dataDetail.isLoading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size={80} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#00000050' />
        <Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
          <View style={styles.slideShow}>
            <Slideshow
              dataSource={this.state.dataSource}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })}
              arrowSize={0}
              height={250}
            />
          </View>
          <View style={styles.contentDetail}>
            <Text numberOfLines={1} style={styles.detailName}>{this.state.name}</Text>
            <View style={styles.containRate}>
              <Rating
                imageSize={15}
                readonly
                startingValue={this.state.rating}
              />
              <Text style={styles.textRating}>{this.state.rating}</Text>
              <Text style={styles.textReview}>({this.state.review} Review)</Text>
            </View>
            <View style={styles.containPrice}>
              <Text style={{ fontFamily: 'Poppins-Light', fontSize: 14 }}>Price: </Text>
              <FlatList
                data={this.state.iconPrice}
                horizontal={true}
                renderItem={({ item }) => this.renderPrice(item)}
              />
            </View>

          </View>
          <CardItem style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ddd' }}>
            <Icon name='clock' size={20} color='#00a600' />
            <Text style={styles.textOpen}>Open</Text>
            <Text style={{ fontFamily: 'Raleway-Medium', color: '#414141' }}>| {`${this.state.open} - ${this.state.close}`}</Text>
          </CardItem>
        </Card>
        <Card style={{ marginLeft: 0, marginRight: 0, flexDirection: 'row', width: '100%' }}>
          <CardItem style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', borderEndWidth: 1, borderEndColor: '#ddd' }}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 17, borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: '5%' }}>Address</Text>
            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12 }}>{this.state.address}</Text>
          </CardItem>
          <CardItem style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 17, borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: '5%' }}>Phone</Text>
            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12 }}>{ this.state.phone ? this.state.phone : 'Unknown' }</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataDetail: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetail: (params) => dispatch(actionList.handleGetDetail(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  slideShow: {
    marginBottom: '4%'
  },
  contentDetail: {
    marginHorizontal: '5%'
  },
  detailName: {
    fontSize: 22,
    color: '#313131',
    fontFamily: 'Poppins-Medium',
    marginEnd: '2%',
    width: '90%'
  },
  containRate: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  containPrice: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '2%'
  },
  textRating: {
    marginLeft: '2%',
    fontFamily: 'Poppins-Medium',
    color: '#313131',
    fontSize: 13,
    marginRight: '2%'
  },
  textReview: {
    fontSize: 13,
    fontFamily: 'Poppins-Light'
  },
  textOpen: {
    color: '#00a600',
    fontFamily: 'Raleway-SemiBold',
    marginLeft: '2%',
    marginRight: '2%'
  },
  listDetail: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '4%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  listDetailTitle: {
    marginVertical: '4%',
    fontFamily: 'OpenSans-Regular',
    marginLeft: '4%'
  }
});
