import { Alert } from "react-native";
import { db } from "../config/FirebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp, query, where } from "firebase/firestore";

// Adiciona uma nova tarefa
export const addItem = async (title, userId, description, dueDate, completed, createdAt, updatedAt) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title,
      userId,
      description,
      dueDate: Timestamp.fromDate(dueDate),
      completed,
      createdAt: Timestamp.fromDate(createdAt),
      updatedAt: Timestamp.fromDate(updatedAt),
    });
    console.log("Tarefa salva:", docRef.id);
    Alert.alert("Sucesso", "Tarefa salva com sucesso");
    return { id: docRef.id, title, userId, description, dueDate, completed, createdAt, updatedAt };
  } catch (e) {
    console.log("Erro ao adicionar tarefa:", e);
    Alert.alert("Erro", "Não foi possível salvar a tarefa");
    return null;
  }
};

// Atualiza o status de conclusão da tarefa
export const updateItem = async (id, completed) => {
  try {
    const itemRef = doc(db, "tasks", id);
    await updateDoc(itemRef, {
      completed,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    console.log("Tarefa atualizada:", id);
    Alert.alert("Sucesso", "Tarefa atualizada com sucesso");
  } catch (e) {
    console.log("Erro ao atualizar tarefa:", e);
    Alert.alert("Erro", "Não foi possível atualizar a tarefa");
  }
};

// Deleta uma tarefa
export const deleteItem = async (id) => {
  try {
    await deleteDoc(doc(db, "tasks", id));
    Alert.alert("Sucesso", "Tarefa deletada com sucesso");
  } catch (e) {
    console.log("Erro ao deletar tarefa:", e);
    Alert.alert("Erro", "Não foi possível deletar a tarefa");
  }
};

// Busca todas as tarefas
export const getItems = async (setListaItem, userId) => {
  try {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        completed: data.completed,
        dueDate: data.dueDate.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };
    });

    setListaItem(items);
  } catch (e) {
    console.log("Erro ao buscar tarefas:", e);
    setListaItem([]);
  }
};
