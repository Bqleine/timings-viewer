import {Component} from "react";
import TimingsTable from "./TimingsTable";

class TimingsViewer extends Component {

    render() {
        if (this.props.timings === "") {
            return <p>Enter a timing in the field above and it will appear formatted here</p>;
        }

        const { additionalInfo, timings } = this.parseTimings(this.props.timings);

        return (
            <div>
                <TimingsTable timings={timings}/>
                <h3>Additional Information</h3>
                <ul>
                    {additionalInfo.map((value, index) => <li key={index}>{value}</li>)}
                </ul>
            </div>
        );
    }

    parseTimings(data) {
        let lines = data.split(/[\r\n]/)
        let res = {type: null, timings: {}, additionalInfo: []}
        res.type = lines[0]
        lines.shift()

        // Each index represents an additional indentation (details)
        let timings = {};

        // We filter the lines so they can be parsed in a good order later
        let parent;
        lines.forEach(line => {
            line = line.trim()

            if (line === "") return
            if (line.startsWith("#") || line.startsWith("Sample time")) {
                // Additional info
                res.additionalInfo.push(line.replace("# ", ""))
            } else {
                // Timing

                // Calculate indent
                let indent = line.match(/^(\*)+/);
                if (indent === null) indent = 0
                else indent = indent.length

                let values = this.parseLine(line);
                if (values === undefined) return;

                let parsed = {
                    name: values[1],
                    time: values[2],
                    count: values[3],
                    avg: values[4],
                    violations: values[5],
                    details: {},
                };

                if (indent === 0) {
                    res.timings[parsed.name] = parsed
                    parent = parsed.name
                } else {
                    if (res.timings[parent] === undefined) return;
                    res.timings[parent].details[parsed.name] = parsed
                }
            }
        })

        // Parse lines
        Object.values(timings).forEach(((indent, index) => {
            indent.forEach(line => {
                let values = this.parseLine(line, index);
                if (values === undefined) return;

                // TODO : allow more depth
                if (index === 0) {
                    let parsed = {
                        name: values[1],
                        time: values[2],
                        count: values[3],
                        avg: values[4],
                        violations: values[5],
                        details: {},
                    };
                    res.timings[parsed.name] = parsed
                } else {
                    console.log(values[1]);
                    let match = values[1].match(/(.+) - (.+)/)
                    if (match === null) return;

                    let { parentName, name } = match

                    if (res.timings[parentName] === undefined) return;

                    let parsed = {
                        name,
                        time: values[2],
                        count: values[3],
                        avg: values[4],
                        violations: values[5],
                        details: {},
                    };

                    res.timings[parentName].details[parsed.name] = parsed
                }
            })
        }))

        // Calculate totals
        res.timings = Object.values(res.timings)

        res.timings.forEach((timing, index) => {
            if (timing.details.length > 0) {
                let time = 0
                let count = 0
                let avg = 0
                let violations = 0

                timing.details.forEach(detail => {
                    time += parseInt(detail.time)
                    count += parseInt(detail.count)
                    avg += parseInt(detail.avg)
                    violations += parseInt(detail.violations)
                })

                timing.time = time
                timing.count = count
                timing.avg = avg
                timing.violations = violations
            }
        })

        return res
    }

    parseLine(line) {
        let values = line.match(/\** *(.+) Time: (\d+) Count: (\d+) Avg: (\d+\.?\d+) Violations: (\d+)/);
        if (values === null || values.length < 6) {
            console.error("Couldn't parse line :" + line)
            return
        }

        return values;
    }
}

export default TimingsViewer;