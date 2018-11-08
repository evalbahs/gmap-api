var constants = require('../helpers/constants');
var httpClient = require('request-promise');
var _ = require('lodash')

var getOptions = function (latlng) {
    return {
        uri: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${constants.API_KEY}`,
        json: true
    };
};

exports.getLocation = function (req, res) {
    
    var options = getOptions(`${req.query.lat},${req.query.lng}`);
    
    httpClient(options)
        .then(function (repos) {
            
            var responseArr = [];
            
            _.each(repos.results, result => {
                let currentLocation = [];
                _.each(result.address_components, component => {
                    if(_.includes(component.types, 'route') || 
                       _.includes(component.types, 'country') ||
                       _.includes(component.types, 'state') ||
                       _.includes(component.types, 'city') ||
                       _.includes(component.types, 'postal_code')){
                        currentLocation.push({
                            name: component.long_name,
                            types: component.types
                        })
                    }
                })
                if(currentLocation.length > 0) {
                    if(responseArr.length == 0) {
                        responseArr.push(currentLocation);
                    } else {
                        if(responseArr[responseArr.length-1][0].name != currentLocation[0].name){
                            responseArr.push(currentLocation);
                        }
                    }
                }
            })

            res.json({
                hasError: false, 
                data: responseArr
            });
        })
        .catch(function (err) {
            res.json({
                hasError: true,
                err
            });
        });
};