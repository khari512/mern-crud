
const ConsolidatedEBListFields =  [
   
    { 
        name:'lab', label:'Labs', type:'Lookup', 
        endpoint:{
            url: `/api/labs`,
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
        name:'list', 
        label:'Consolidated EB List', 
        type:'Table',
        dependentFieldName: 'lab',
        columns: [
            { name:'lab', label:'Lab' },
            { name:'projectTitle', label:'Project Title' },
            { name:'projectNo', label:'Project No.' },
            { name:'ebNoAndEbDateStr', label:'ebNoAndEbDateStr' },
            
            { name:'ebNumber', label:'EB Number' },
            { name:'ebDate', label:'Last EB Conducted' }
            
        ],
        endpoint: {
            url: '/api/consolidated-eb-list',
            params:{
                'labName': 'lab'
            }
        },
        configurations: {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "EBEntry",
            no_data_text: 'Loading please wait....',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        }
    }
    
  
];

const ConsolidatedEBListMetadata = {
    pageTitle: 'Consolidated EB List',
    components: ConsolidatedEBListFields,
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

export default ConsolidatedEBListMetadata;