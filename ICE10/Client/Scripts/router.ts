namespace core
{
    export class Router
    {
        private m_activeLink: string;
        private m_linkData: string;
        private m_routingTable: string[];

        // public properties (getters and setters)
        get ActiveLink(): string
        {
            return this.m_activeLink;
        }

        set ActiveLink(link:string)
        {
            this.m_activeLink = link;
        }

        get LinkData(): string
        {
            return this.m_linkData;
        }

        set LinkData(data:string)
        {
            this.m_linkData = data;
        }

        // constructor

        /**
         * Creates an instance of Router.
         * 
         * @constructor
         */
        constructor()
        {
            this.m_activeLink = "";
            this.m_linkData = "";
            this.m_routingTable = []; // creates an empty array
        }
        
        // public methods

        /**
         * Adds a new route to the Routing table
         *
         * @param {string} route
         */
        Add(route: string): void
        {
            this.m_routingTable.push(route);
        }

        /**
         * This replaces the current routing table with a new one
         * Routes should begin with '/' character
         * 
         * @param {string[]} routingTable
         */
        AddTable(routingTable: string[]): void
        {
            this.m_routingTable = routingTable;
        }

        /**
         * This method finds the index of the route in the routing table
         * otherwise it returns -1 if the route is not found
         *
         * @param {string} route
         * @returns {number}
         */
        Find(route: string): number
        {
            return this.m_routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the Routing Table
         * It returns true if the route was successfully removed,
         * otherwise it returns false
         *
         * @param {string} route
         * @returns {boolean}
         */
        Remove(route: string): boolean
        {
            if(this.Find(route) > -1)
            {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        // overridden methods

        /**
         * This method overrides the built-in toString method and returns the entire routing table as a string
         * 
         * @override
         * @returns {string}
         */
        toString(): string
        {
            return this.m_routingTable.toString();
        }
    }
}

let router: core.Router = new core.Router();
router.AddTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/projects",
    "/register",
    "/login",
    "/edit"
]);

let route: string = location.pathname; // alias for location.pathname

if(router.Find(route) > -1)
{
    router.ActiveLink = (route == "/") ? "home" : route.substring(1);
}
else
{
    router.ActiveLink = "404"; // file not found
}

