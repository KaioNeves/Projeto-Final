import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Adicionar from '../components/Adicionar';
import Saldo from '../components/Saldo';
import Titulo from '../components/Titulo';
import api from '../utils/Api';

export const Saldos = ({ route, navigation }) => {

    const [ saldos, setSaldos ] = useState([]);

    const ListarSaldos = async () => {
        try {
            const resultado = await api.get("usuarios/"+route.params.id+"/saldos");

            if (resultado !== null) {
                setSaldos(resultado.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const SomarSaldos = (...saldos) =>
    {
        const somados = [];

        saldos[0].map((val) => {
            somados.push(val.valor);
        });

        try {

            if (somados !== null){
                return somados.reduce((acumulador, valor) => acumulador + valor );
            }else{
                return 0;
            }
        } catch (error) {
            return 0;
        }
    }

    useEffect(() => {
        ListarSaldos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <Titulo titulo= "Saldos"/>
                <Adicionar tipo = "Saldo"
                navigation={navigation}
                idUsuario={route.params.id} />
                </View>
            <Text style={styles.total}>TOTAL : R$
                {SomarSaldos(saldos)}</Text>
            <View style={styles.lista}>    
                  {saldos.map((item) => 
                     <Saldo
                           key={item.id}
                           id={item.id}
                           idCliente={route.params.id}
                           nome={route.params.nome}
                           valor={item.valor}
                           navigation={navigation}
                    />
              )}
              </View>
        </View>
    );
}

export default Saldos;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#6840F5',
        padding: '0px 30px'
    },

    lista: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: '30px',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
    },

    nomeCliente: {
        color: '#fff',
        marginHorizontal: '40px',
    },

    total: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '28px',
        marginVertical: '40px',
        marginHorizontal: '40px',
    }
});