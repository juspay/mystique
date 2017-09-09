/*
* Copyright (c) 2012-2017 "JUSPAY Technologies"
* JUSPAY Technologies Pvt. Ltd. [https://www.juspay.in]
*
* This file is part of JUSPAY Platform.
*
* JUSPAY Platform is free software: you can redistribute it and/or modify
* it for only educational purposes under the terms of the GNU Affero General
* Public License (GNU AGPL) as published by the Free Software Foundation,
* either version 3 of the License, or (at your option) any later version.
* For Enterprise/Commerical licenses, contact <info@juspay.in>.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  The end user will
* be liable for all damages without limitation, which is caused by the
* ABUSE of the LICENSED SOFTWARE and shall INDEMNIFY JUSPAY for such
* damages, claims, cost, including reasonable attorney fee claimed on Juspay.
* The end user has NO right to claim any indemnification based on its use
* of Licensed Software. See the GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program. If not, see <https://www.gnu.org/licenses/agpl.html>.
*/

const immu = require('immu');
var state = immu({});
var events = immu([]);



module.exports = (stateHandlerMap) => {
	return {
		evaluate : (stateHandler, action, payload) => {
			if(typeof action === "string" && typeof stateHandler === "string") {
				// TODO : Proper functional apprach of handling errors has to be used.
				// TODO : Remove if conditions for null checks.
				if(stateHandlerMap[stateHandler]) {
					var result = stateHandlerMap[stateHandler](action, payload, state);
					events = events.push(immu({
						stateHandler : stateHandler,
						action : action,
						payload : payload,
						state : result
					}));
					state = events[events.length - 1].state;
					return events[events.length - 1];
				} else {
					throw new Error("stateHandler not present in the stateHandlerMap.");
				}
			} else {
				throw new Error("Action name and stateHandler name have to be string.");
			}
		}
	}
}
