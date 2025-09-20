import * as Notifications from "expo-notifications";

export const scheduleTaskNotification = async (task) => {
  const dueDate = new Date(task.dueDate);

  if (dueDate <= new Date()) {
    console.log("Data de vencimento já passou, não será agendada notificação.");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lembrete de Tarefa',
      body: task.title,
      sound: true,
    },
    trigger: dueDate,
  });

  console.log(`Notificação agendada para ${dueDate.toLocaleString()}`);
};


export const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status === "granted") {
      return; 
    }

    try {
      const response = await Notifications.requestPermissionsAsync();
      if (response.granted) {
        console.log("permission granted");
      } else {
        console.log("permission denied");
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error);
    }
  };
    

