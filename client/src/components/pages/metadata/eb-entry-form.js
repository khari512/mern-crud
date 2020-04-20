
const EBEntryFields =  [
   
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
    },
    {
        name: 'projectNo',
        label: 'Project No.',
        type: 'lookup',
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
        name: 'ebNumber',
        label: 'EB Number',
        type: 'number',
        options:[
            { label: '1' , value: '1' },
            { label: '2' , value: '2' },
            { label: '3' , value: '3' },
            { label: '4' , value: '4' }
        ]

    },
    {
        name:'actionPts',
        label: 'Action Points',
        type: 'textarea'

    },
    {
        name: 'date',
        label: 'Date of EB',
        type: 'Date'
    }
  
];

const EBEntryFormMetadata = {
    title: 'Add EB Entry',
    components: EBEntryFields,
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

export default EBEntryFormMetadata;