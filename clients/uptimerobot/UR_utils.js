const _ = require('lodash')

module.exports = {
  mapMonitorsToChecks: function(monitors) {
    const checks = []
    monitors.forEach((monitor) => {
      let check = {
        type: 'HTTP',
        label: monitor.friendly_name,
        target: monitor.url,
        enabled: "active",
        public: true,
        interval: monitor.interval,
        foreignContactIDs: []
      }
      checks.push(check)
    })
    return checks
  },
  mapContacts: function(contacts) {
    mappedContacts = []
    contacts.alert_contacts.forEach((contact) => {
      mappedContact = {
        foreignID: parseInt(contact.id),
        custrole: 'owner',
        name: contact.friendly_name,
        contactAddress: contact.value,
        contactType: 'email',
        foreignContactGroups: []
      }
      mappedContacts.push(mappedContact)
    })
    return mappedContacts
  },
  mapContactsToChecks: function(checks, contactMap) {
    contacts = []
    contactMap.forEach((contact) => {
      contacts.push(contact.foreignID)
    })
    checks.forEach((check) => {
      check.foreignContactIDs = [contacts]
    })
    return checks
  }
}
