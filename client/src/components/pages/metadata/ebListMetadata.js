
const EBListFields =  [
    
    { 
        name:'lab', label:'Labs', type:'Lookup', 
        endpoint:{
            url: `/api/labs`,
            q: `name`,
            responseMapping:{
                "mappings": [
                    {
                      "from": "name",
                      "to": "label"
                    },
                    {
                        "from": "name",
                        "to": "value"
                    }
                  ]
            }
        } 
    },

    { 
        name:'projectTitle', 
        label:'Project Title', 
        type:'Lookup',
        depedentFieldName: 'lab',
        endpoint:{
            url: '/api/projects',
            q: 'lab',
            responseMapping:{
                "mappings": [
                    {
                      "from": "projectTitle",
                      "to": "label"
                    },
                    {
                        "from": "projectTitle",
                        "to": "value"
                    }
                  ]
            }
        }
    }
  
];

const EBListMetadata = {
    title: 'Update EB List',
    components: EBListFields,
    endpoints:[
        {
            type: 'UPDATE',
            method: 'PUT',
            url: '/api/update-eblist'
        },
        {
            type: 'CREATE',
            method: 'POST',
            url: '/api/update-eblist'
        }
    ]
}

export default EBListMetadata;