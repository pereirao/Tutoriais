const request = require('request');

const codes = [
    "AFG", "ALB", "DZA", "AND", "AGO", "AIA", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT",
    "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL",
    "BES", "BIH", "BWA", "BRA", "VGB", "BRN", "BGR", "BFA", "BDI", "KHM", "CMR", "CAN",
    "CPV", "CYM", "CAF", "TCD", "CHL", "CHN", "COL", "COM", "COG", "CRI", "CIV", "HRV",
    "CUB", "CUW", "CYP", "CZE", "COD", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV",
    "GNQ", "ERI", "EST", "ETH", "FRO", "FLK", "FJI", "FIN", "FRA", "PYF", "GAB", "GMB",
    "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GUM", "GTM", "GGY", "GIN", "GNB",
    "GUY", "HTI", "HND", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR",
    "ITA", "JAM", "JPN", "JEY", "JOR", "KAZ", "KEN", "KWT", "KGZ", "LAO", "LVA", "LBN",
    "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MKD", "MDG", "MWI", "MYS", "MDV", "MLI",
    "MLT", "MRT", "MUS", "MEX", "MDA", "MCO", "MNG", "MNE", "MSR", "MAR", "MOZ", "MMR",
    "NAM", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "MNP", "NOR", "OMN", "PAK",
    "PSE", "PAN", "PNG", "PRY", "PER", "PHL", "POL", "PRT", "PRI", "QAT", "ROU", "RUS",
    "RWA", "KNA", "LCA", "VCT", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP",
    "SXM", "SVK", "SVN", "SOM", "ZAF", "KOR", "SSD", "ESP", "LKA", "SDN", "SUR", "SWZ",
    "SWE", "CHE", "SYR", "TWN", "TJK", "TZA", "THA", "TLS", "TGO", "TTO", "TUN", "TUR",
    "TCA", "UGA", "UKR", "ARE", "GBR", "USA", "VIR", "URY", "UZB", "VAT", "VEN", "VNM",
    "ESH", "YEM", "ZMB", "ZWE"
];

codes.forEach((c) => {
    request("https://restcountries.eu/rest/v2/alpha/" + c, { json: true }, (err, res, body) => {
        if (err) {
            console.log("Erro:", c);
        }
        console.log(body.flag);
    });
});
