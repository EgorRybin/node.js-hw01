const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');
const contactsPath = path.join(__dirname, 'db/contacts.json');

async function saveToContacts(contacts = []) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
        throw new Error('contact not found');
    }
    return contact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    console.log('index', index);
    if (index === -1) {
        throw new Error('contact not founddddddd');
    }
    const [deletedcontact] = contacts.splice(index, 1);
    await saveToContacts(contacts);
    return deletedcontact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const contact = {
        name,
        email,
        phone,
        id: uuid(),
    };
    contacts.push(contact);
    await saveToContacts(contacts);
    return contact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
