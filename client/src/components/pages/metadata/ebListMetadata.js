
const EBListFields =  [
    
    { 
        name:'lab', label:'Lab Name', type:'Lookup', 
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
    },
    { 
        name:'projectNo', 
        label:'Project Number', 
        type:'Lookup',
        depedentFieldName: 'lab',
        endpoint:{
            url: '/api/projects',
            q: 'lab',
            responseMapping:{
                "mappings": [
                    {
                      "from": "projectNo",
                      "to": "label"
                    },
                    {
                        "from": "projectNo",
                        "to": "value"
                    }
                  ]
            }
        }
    },
    {
        name:'ebNumber',label:'EB Number',type:'number'
    },
    {
        name:'ebDate',label:'Date of EB',type:'date'
    },
    {
        name:'actionPoints',label:'Action Points',type:'text'
    }
];

const EBListMetadata = {
    title: 'Add EB Entry',
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