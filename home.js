import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';

const HomeScreen = () => {
  const [faturaPaga, setFaturaPaga] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const closeModal = () => {
    setModalContent(null);
  };

  const handlePagarFatura = () => {
    if (faturaPaga) {
      return;
    }

    const newModalContent = {
      isVisible: true,
      title: 'Pagar parcela do mês recorrente?',
      message: 'Valor: R$ 231,45',
      buttons: [
        { text: 'Cancelar', onPress: () => closeModal() },
        {
          text: 'Pagar',
          onPress: () => {
            console.log('Pagamento realizado');
            setFaturaPaga(true);
            closeModal();
          },
        },
      ],
      closeModal: () => closeModal(),
    };

    setModalContent(newModalContent);
  };

  const handleMinhasFaturas = () => {
    if (faturaPaga) {
      const newModalContent = {
        isVisible: true,
        title: 'Minhas Faturas',
        message: 'Todas as faturas estão pagas.',
        buttons: [
          { text: 'OK', onPress: () => closeModal() },
        ],
        closeModal: () => closeModal(),
      };

      setModalContent(newModalContent);
    } else {
      const valorFaturas = 'R$ 231,45';
      const mensagem = `Pagar todas as faturas em aberto?\n\n${valorFaturas}`;

      const newModalContent = {
        isVisible: true,
        title: 'Minhas Faturas',
        message: mensagem,
        buttons: [
          { text: 'Cancelar', onPress: () => closeModal() },
          {
            text: 'Pagar',
            onPress: () => {
              console.log('Pagamento realizado');
              setFaturaPaga(true);
              closeModal();
            },
          },
          {
            text: 'Copiar Código de Barras',
            onPress: async () => {
              try {
                await Clipboard.setString('SEU_CÓDIGO_DE_BARRAS_AQUI');
                console.log('Código de Barras Copiado');
              } catch (error) {
                console.error('Erro ao copiar código de barras:', error);
              }
            },
          },
        ],
        closeModal: () => closeModal(),
      };

      setModalContent(newModalContent);
    }
  };

  const carouselImages = [
    require('./assets/calcula.png'),
    require('./assets/moeda.png'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <TouchableOpacity style={styles.gearIcon}>
          <Ionicons name="settings-sharp" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <View style={[styles.subContainer2]}>
        <Carousel
          data={carouselImages}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item} style={styles.carouselImage} />
            </View>
          )}
          sliderWidth={380}
          itemWidth={350}
          loop={true}
          autoplay={true}
          autoplayInterval={2000}
        />
      </View>

      <View style={styles.subContainer4}>
        <Text style={[styles.welcomeText, { color: 'white' }]}>Olá, Igor!</Text>
        {faturaPaga ? (
          <TouchableOpacity style={[styles.payButton, { backgroundColor: '#CCDCEA' }]}>
            <Text style={[styles.payButtonText, { color: '#06436B' }]}>
              Você não possui nenhuma fatura em aberto. Suas contas estão todas em dia, parabéns!
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.faturaContainer}>
            <Text style={{ color: 'white' }}>Fatura (mês recorrente)</Text>
            <Text style={[styles.amount, { color: 'white' }]}>R$ 231,45</Text>
            <TouchableOpacity style={[styles.payButton, { backgroundColor: 'white' }]} onPress={handlePagarFatura}>
              <Text style={[styles.payButtonText, { color: '#06436B' }]}>Pagar Fatura</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={[styles.subContainer5, { marginHorizontal: 30 }]}>
        <View style={styles.centeredButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#CCDCEA' }]}>
            <Ionicons name="md-calendar" size={24} color="#06436B" />
            <Text style={{ color: '#06436B' }}>Agendar Consulta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#CCDCEA' }]} onPress={handleMinhasFaturas}>
            <Ionicons name="md-receipt" size={24} color="#06436B" />
            <Text style={{ color: '#06436B' }}>Minhas Faturas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#CCDCEA' }]}>
            <Ionicons name="md-card" size={24} color="#06436B" />
            <Text style={{ color: '#06436B' }}>Carteirinha Digital</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.subContainer6]}>
        <Text style={[styles.moreOptionsText, { color: '#06436B' }]}>Mais Opções</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#06436B' }]}>
            <Ionicons name="md-newspaper" size={24} color="white" />
            <Text style={{ color: 'white' }}>Notícias da UpbaseBank</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#06436B' }]}>
            <Ionicons name="md-call" size={24} color="white" />
            <Text style={{ color: 'white' }}>Contatos Importantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#06436B' }]}>
            <Ionicons name="md-medkit" size={24} color="white" />
            <Text style={{ color: 'white' }}>Plano Odontológico</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={modalContent !== null} backdropOpacity={0.5}>
        {modalContent && (
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'Archivo', marginBottom: 10, padding: 20 }}>
                {modalContent.title}
              </Text>
              <Text style={{ paddingHorizontal: 20 }}>{modalContent.message}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 20 }}>
                {modalContent.buttons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ padding: 10, marginRight: 10, backgroundColor: '#06436B', borderRadius: 5 }}
                    onPress={() => {
                      button.onPress();
                      closeModal();
                    }}
                  >
                    <Text style={{ color: 'white' }}>{button.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#06436B",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  subContainer2: {
    backgroundColor:"#06436B",
    alignItems: "center",
    marginTop: 10,
  },
  subContainer4: {
    backgroundColor: '#06436B',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 50,
    alignItems:"flex-start"
  },
  subContainer5: {
    backgroundColor: '#06436B',
    marginTop: 30,
    marginBottom: 40,
  },
  subContainer6: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'Archivo',
    marginBottom: 10,
    alignItems:"flex-start"
  },
  amount: {
    fontSize: 20,
    fontWeight: 'Archivo',
  },
  faturaContainer: {
    marginBottom: 20,
  },
  centeredButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:15
  },
  payButton: {
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  payButtonText: {
    fontSize: 15,
    fontWeight: 'Archivo',
    paddingHorizontal: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  actionButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    textAlign:'center',
    fontWeight:"Archivo",
    margin: 5,
  },
  moreOptionsText: {
    fontSize: 24,
    fontWeight: 'Archivo',
    marginTop:10,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  gearIcon: {
    paddingHorizontal:10,
    marginTop:10,
  },
  logo: {
    width: 220,
    height: 45,
    marginTop:10
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  carouselImage: {
    width: 355,
    height: 150,
    resizeMode: 'contain',
    borderRadius:20
  },
});

export default HomeScreen;
