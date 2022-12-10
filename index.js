const Contacts = require('./contacts');
const { program } = require('commander');
program
    .option('-a, --action <string>')
    .option('-i, --id <string>')
    .option('-n, --name <string>')
    .option('-e, --email <string>')
    .option('-ph, --phone <string>');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    try {
        switch (action) {
            case 'list': {
                const contacts = await Contacts.listContacts();
                console.log(contacts);
                break;
            }
            case 'get': {
                const contact = await Contacts.getContactById(id);
                console.log(contact);
                break;
            }
            case 'add': {
                const contact = await Contacts.addContact(name, email, phone);
                console.log(contact);
                break;
            }
            case 'remove': {
                const contact = await Contacts.removeContact(id);
                console.log(contact);
                break;
            }
            default:
                console.log('Unknown action');
        }
    } catch (error) {
        console.log('Error:', error);
    }
};
invokeAction(argv);
