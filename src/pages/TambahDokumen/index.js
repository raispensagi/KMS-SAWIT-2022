import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';
import { ShortInput, LongInput, ActionButton, RedButton, AddButton } from '../../component/atoms';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import CardView from "react-native-cardview";
import { colors, colortext } from '../../utils';
const TambahDokumen = ({navigation}) => {
    const [form, setForm] = useState({
        judul: '',
        penulis:'',
        tahun:'',
        penerbit:'',
        halaman:'',
        bahasa:'',
        deskripsi:'',
        file:'',
        kategori:'',
    });
    const onInputChange = (value, input) => {
        setForm({
            ...form,
            [input]: value,
            kategori: selectedValue.toString(),
        })
    }
    const simpan = async (screen) => {
        const token = await AsyncStorage.getItem('userToken')
        const userToken = JSON.parse(token) 
        if (form.judul==='') {
            Alert.alert("Judul tidak boleh kosong")
        }
        else if (form.penulis==='') {
            Alert.alert("Penulis tidak boleh kosong")
        }
        else if (form.tahun==='') {
            Alert.alert("Tahun tidak boleh kosong")
        }
        else if (form.penerbit==='') {
            Alert.alert("Penerbit tidak boleh kosong")
        }
        else if (form.halaman==='') {
            Alert.alert("Halaman tidak boleh kosong")
        }
        else if (form.bahasa==='') {
            Alert.alert("Bahasa tidak boleh kosong")
        }
        else if (form.file==='') {
            Alert.alert("Link unduh tidak boleh kosong")
        }
        else if (form.deskripsi==='') {
            Alert.alert("Deskripsi tidak boleh kosong")
        }
        if (form.judul!=='' && form.penulis!=='' && form.tahun!=='' && form.penerbit!=='' && form.halaman!==''&& form.bahasa!==''&& form.file!==''&& form.deskripsi!=='') {
        fetch(`http://117.53.47.76:8001/api/edokumen/draft `,
        {
            method:"POST",
            headers: new Headers ( {
                Authorization : 'Bearer ' + userToken,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(form)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            console.log(form)
            Alert.alert('Konten disimpan ke draft')
            navigation.goBack(screen)
        }
        )
        .catch((error) => {
            console.error(error);
        });
    }
    };
    const bagikan = async (screen) => {
        const token = await AsyncStorage.getItem('userToken')
        const userToken = JSON.parse(token) 
        if (form.judul==='') {
            Alert.alert("Judul tidak boleh kosong")
        }
        else if (form.penulis==='') {
            Alert.alert("Penulis tidak boleh kosong")
        }
        else if (form.tahun==='') {
            Alert.alert("Tahun tidak boleh kosong")
        }
        else if (form.penerbit==='') {
            Alert.alert("Penerbit tidak boleh kosong")
        }
        else if (form.halaman==='') {
            Alert.alert("Halaman tidak boleh kosong")
        }
        else if (form.bahasa==='') {
            Alert.alert("Bahasa tidak boleh kosong")
        }
        else if (form.file==='') {
            Alert.alert("Link unduh tidak boleh kosong")
        }
        else if (form.deskripsi==='') {
            Alert.alert("Deskripsi tidak boleh kosong")
        }
        if (form.judul!=='' && form.penulis!=='' && form.tahun!=='' && form.penerbit!=='' && form.halaman!==''&& form.bahasa!==''&& form.file!==''&& form.deskripsi!=='') {
        fetch(`http://117.53.47.76:8001/api/edokumen/post`,
        {
            method:"POST",
            headers: new Headers ( {
                Authorization : 'Bearer ' + userToken,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(form)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            console.log(form)
            Alert.alert('Konten telah dibagikan')
            navigation.goBack(screen)
        }
        )
        .catch((error) => {
            console.error(error);
        });
    }
    };
    const [selectedValue, setSelectedValue] = useState("Pendahuluan terkait Kelapa Sawit");
    return(
        <ScrollView>
            <Text style={styles.textbutton} >Tuliskan Judul</Text>
            <ShortInput placeholder='Judul' onChangeText={value=>onInputChange(value, 'judul')}/>
            <Text style={styles.textbutton} >Tuliskan Penulis</Text>
            <ShortInput  placeholder='Penulis' onChangeText={value=>onInputChange(value, 'penulis')}/>
            <Text style={styles.textbutton} >Tuliskan Tahun</Text>
            <ShortInput  placeholder='Tahun' onChangeText={value=>onInputChange(value, 'tahun')}/>
            <Text style={styles.textbutton} >Tuliskan Pernerbit</Text>
            <ShortInput  placeholder='Penerbit' onChangeText={value=>onInputChange(value, 'penerbit')}/>
            <Text style={styles.textbutton} >Tuliskan Halaman</Text>
            <ShortInput  placeholder='Halaman' onChangeText={value=>onInputChange(value, 'halaman')}/>
            <Text style={styles.textbutton} >Tuliskan Bahasa</Text>
            <ShortInput  placeholder='Bahasa' onChangeText={value=>onInputChange(value, 'bahasa')}/>
            <Text style={styles.textbutton} >Tuliskan Link Untuk Mengunduh File</Text>
            <ShortInput  placeholder='Link Unduh' onChangeText={value=>onInputChange(value, 'file')}/>
            {/* <CardView style={styles.container} cardElevation={1} cardMaxElevation={1} cornerRadius={9}>
                <Picker
                    itemStyle={{fontSize:14, fontWeight: 'normal', fontFamily:'Nunito', colors:colortext.gray}}
                    selectedValue={selectedValue}
                    style={{ width: 320, opacity:0.6,  marginTop:-3}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    mode='dropdown'
                >
                    <Picker.Item label="Pendahuluan terkait Kelapa Sawit" value="Pendahuluan terkait Kelapa Sawit" />
                    <Picker.Item  label="Persiapan Lahan" value="Persiapan Lahan" />
                    <Picker.Item  label="Pembibitan" value="Pembibitan" />
                    <Picker.Item  label="Penanaman" value="Penanaman" />
                    <Picker.Item  label="Pengendalian Hama Penyakit Gulma" value="Pengendalian Hama Penyakit Gulma" />
                    <Picker.Item  label="Pemeliharaan Tanaman" value="Pemeliharaan Tanaman" />
                    <Picker.Item  label="Panen" value="Panen" />
                    <Picker.Item  label="Manajemen SDM, Keuangan, dan Pemasaran" value="Manajemen SDM, Keuangan, dan Pemasaran" />
                </Picker>
            </CardView> */}
            <Text style={styles.textbutton} >Tuliskan Ringkasan Dari Dokumen Itu</Text>
            <LongInput  placeholder='Deskripsi' onChangeText={value=>onInputChange(value, 'deskripsi')}/>
            <AddButton  title1='Simpan pada draft' title2='Bagikan' 
                        onPress1={()=> simpan('Daftar Draft')}
                        onPress2={()=> bagikan('KMS Sawit')}

            />
        </ScrollView>
    )
}


const styles = {
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: colors.gray4,
    opacity:0.6,
    height: 43, 
    marginHorizontal: 14, 
    marginTop: 10,
    opacity:0.6
  },
  textbutton : {
    fontFamily: 'Nunito',
    fontSize: 16,
    marginHorizontal: 14, 
    marginTop: 10,
},
};
export default TambahDokumen;