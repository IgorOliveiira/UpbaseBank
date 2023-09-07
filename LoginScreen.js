import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image, 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  
  const formatarCPF = (text) => {
    text = text.replace(/\D/g, ""); 
    text = text.replace(/(\d{3})(\d)/, "$1.$2"); 
    text = text.replace(/(\d{3})(\d)/, "$1.$2"); 
    text = text.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
    return text;
  };

  const handleLogin = () => {
    if (cpf === "000.000.000-00" && senha === "suasenha") {
      navigation.navigate("TelaPrincipal");
    } else {
      alert("CPF ou senha incorretos");
    }
  };

  return (
    <View style={styles.container}>
        <Image
        source={require("./assets/logo.png")}
        style={styles.logo}
        />
      <Text style={styles.infoText}>
        Informe seu CPF e sua senha para acessar sua conta
      </Text>
      <Text style={[styles.inputLabel, {textAlign: "left" }]}>Digite seu CPF</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          if (text.length <= 14) {
            setCpf(formatarCPF(text));
          }
        }}
        value={cpf}
        maxLength={14} 
      />
      <Text style={styles.inputLabel}>Senha             </Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          secureTextEntry={!mostrarSenha}
          onChangeText={(text) => setSenha(text)}
          value={senha}
        />
        <TouchableOpacity
          style={styles.showHideButton}
          onPress={() => setMostrarSenha(!mostrarSenha)}
        >
          <Ionicons
            name={mostrarSenha ? "eye-off" : "eye"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Acessar Minha Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06436B",
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: "center", 
    justifyContent: "center",
  },
  logo: {
    width: 450,
    height: 120, 
    marginBottom: 30, 
    marginLeft:50,
  },
  inputLabel: {
    color: "white",
    paddingEnd: 300,
    fontSize: 12,
    marginBottom: 0,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 50, 
    color: "white",
    textAlign: "left", 
  },
  input: {
    width: "95%",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "white",
    paddingHorizontal: 20,
    marginBottom: 40, 
    color: "white"
  },
  passwordInputContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    marginBottom: 45, 
  },
  passwordInput: {
    flex: 1,
    height: 35,
    paddingHorizontal: 20,
    color: "white",
  },
  showHideButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  loginButton: {
    backgroundColor: "#CCDCEA",
    paddingVertical: 12,
    paddingHorizontal: 125,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#06436B",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LoginScreen;
