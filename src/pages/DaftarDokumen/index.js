import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBox, WhiteButton, BoxKonten, BoxKontenVideo } from '../../component/atoms';
import { Kelapa } from '../../assets';
import { colors } from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';

const DaftarDokumen = ({navigation}) => {
    const [loading, setLoading]=useState(true)
    const [data, setData] = useState([]);
    const [arraydata, setArrayData]=useState([]);
    const getData = async () => {
        const token = await AsyncStorage.getItem('userToken')
        const userToken = JSON.parse(token)          
        fetch(`http://117.53.47.76:8001/api/konten/edokumen`,
        {
            method:"GET",
            headers: new Headers ( {
                Authorization : 'Bearer ' + userToken
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setLoading(false)
            setData(responseJson.konten.reverse())
            setArrayData(responseJson.konten)
        }
        )
        .catch((error) => {
            console.error(error);
        });
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });
        return unsubscribe;
      }, [navigation]);

    const [refreshing,setRefreshing]= useState(false)
    const onRefresh = useCallback( async ()=> {
        setRefreshing(true);
        try {
            getData();
            setRefreshing(false)
        }  
        catch {
            console.error();
        }             

      }, [refreshing])
    const [value, setValue] = useState()
    const searchFilterFunction = text => {
        
        setValue(text)
        const newData = arraydata.filter(item => {
          const itemData = `${item.judul.toUpperCase()} ${item.konten.map(value => value.penerbit).toString().toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        setData (newData);
        console.log("data.length", newData.length);
      };
    if (loading===true) {
            return (
                <View style={{alignItems: 'center',
                flex: 1,
                justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={colors.red}/>
                </View>
            )
    }
    return (
        <SafeAreaView style={{backgroundColor:colors.white1, flex:1}}>
           <SearchBox onChangeText={ text => searchFilterFunction(text)} value={value}/> 
           {data.length < 1 ? (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text>Kata yang dicari tidak dapat ditemukan.</Text>
                <Text>Cobalah masukan kata yang lain.</Text>
            </View>): 
            (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
                renderItem={({item}) => (
                <BoxKontenVideo  kategori={item.tipe}
                            title={item.judul} 
                            isi={item.konten.map(value => value.penerbit).toString()}
                            onPress={()=> navigation.navigate('EDokumen', {id:item.id})}
                            />)}
                keyExtractor={item => item.id.toString()}
            />)}
        </SafeAreaView>
    )
};
export default DaftarDokumen;