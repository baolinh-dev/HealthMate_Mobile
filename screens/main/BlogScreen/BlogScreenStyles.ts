// BlogScreenStyles.ts
import { StyleSheet } from "react-native";
import colors from "../../../constants/colors"; // Import your colors file if needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  blogPost: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  infor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  author: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  commentSection: {
    marginTop: 10,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  commentAuthor: {
    fontWeight: "bold",
  },
  commentContent: {
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10, 

    width: "40%"

  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10, 
    width: "40%", 
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  toggleCommentsButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  toggleCommentsText: {
    color: "#888",
    fontWeight: "bold",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  }, 
  actionButtonPostForm: {
    display: "flex",  
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default styles;
