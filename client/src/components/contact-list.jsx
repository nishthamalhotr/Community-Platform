import { useAppStore } from "@/store";

const ContactList = ({contacts,isChannel=false}) => {

    const {selectedChatData,setSelectedChatData,setSelectedChatType,selectedChatType,setSelectedChatMessages,} = useAppStore();

    const handleClick = (contact) =>{
       if(isChannel) setSelectedChatType("channel");
        else selectedChatType("contact");
        setSelectedChatData(contact);
        if(selectedChatData && selectedChatData._id !== contact._id){
            setSelectedChatMessages([]);
        }
    }
  return (
  <div className="mt-5 ">{contacts.map((contacts)=>(
  <div key={contacts._id}>{contacts._id}</div>
   ))}
</div>
);
};

export default ContactList;