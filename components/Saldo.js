import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/Api';

export const Saldo = (props) => {

    const Deletar = (id) => {
        api.delete('usuarios/'+props.idCliente+'/saldos/'+id).then(() => 
        props.navigation.push('Saldos', { id : props.idCliente, nome : props.nome }));
    }

    return (
        <View style={styles.card}>
            <Text style={styles.valor}>
            {props.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>

            <TouchableOpacity onPress={() => Deletar(props.id)}>
                <Image style={styles.lixeira}
                source={{ uri: 'https://p.kindpng.com/picc/s/200-2009551_full-trash-icon-hd-png-download.png',
            }} />
                </TouchableOpacity>       
        </View>
    );
}

export default Saldo;

const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '12px',
        marginVertical: '10px',
        paddingVertical: '10px',

        shadowColor: '#3F3D46',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    lixeira: {
        width: 20,
        height: 20,
    },

    valor: {
        color: '#5A5765',
        fontSize: '20px',
        fontWeight: 'bold'
    }
});