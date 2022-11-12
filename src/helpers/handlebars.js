const Handlebars=require("handlebars");
module.exports={
    sum: (a, b) => a + b,
        multiplication: (a, b) => a * b,
        checkcurrent: (current) => {
            if (current == 1) {
                return true;
            }else{
                return false;
            }
        },
        items: (current) => {
            var i = (Number(current) > 3 ? Number(current) - 2 : 1);
            if (i != 1) {
                return true;
            }
        },
        for: (current, pages, kq, type) => {
            kq = []
            var i = (Number(current) > 3 ? Number(current) - 2 : 1);
            for (; i <= (Number(current) + 2) && i <= pages; i++) {
                kq.push({
                    location: i,
                    type
                });
            }
            
            return kq;
        },
        for1: (current, pages, kq) => {
            kq = []
            var vt=0;
            var i = (Number(current) > 3 ? Number(current) - 2 : 1);
            for (; i <= (Number(current) + 2) && i <= pages; i++) {
                kq[vt]=i;
                vt++;
            }
            
            return kq;
        },
        checklast: (current, pages) => {           
            if ((Number(current) + 2) < pages) {
                return true;
            } else {
                return false;
            }
        },
        lastitems: (current, pages) => {
            if (current == pages) {
                return true;
            }else{
                return false;
            }
        },
        sortable:(field,sort)=>{
            const sortType=field===sort.column ? sort.type:'default' ;

            const icons={
                default:'oi oi-elevator',
                asc:'oi oi-sort-ascending',
                desc:'oi oi-sort-descending',
            };

            const types={
                default:'desc',
                asc:'desc',
                desc:'asc',
            };

            const icon=icons[sortType];
            const type=types[sortType];

            const address=Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

            const output=`<a href="${address}"><span class="${icon}"></span> </a>`;
            return new Handlebars.SafeString(output);
        }
}