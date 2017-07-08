# ng2-auto-suggestion
### <i>A auto suggestion component for angular 2+</i>
-----------------
#### <i>Just source code, for time reason, no demos, and not support npm etc. yet.</i>
-----------------

## **keyword**  <br/>
> [Input] Text of the keyword input box.

## **placeholder**  <br/>
> [Input] Hint text of the [keyword](#keyword--) input box.

## **listPerTime**  <br/>
> [Input] Maximum item number to list per time. Default is 5.

## **autoReset**  <br/>
> [Input] When set true, [keyword](#keyword--) input box will be cleared when one suggestion is selected. Default is false.

## **dataSource**  <br/>
> [Input] Data source will be used to load or refresh the suggestions according to [keyword](#keyword--) input text changing.

## **oneTimeBinding**  <br/>
> [Input] When set true, suggestions will just be fetched from [dataSource](#datasource--), and [`inputChange`](#inputchange--) event will not be emitted. Default is false.

## **caseSensitive**  <br/>
> [Input] When set true, suggestion filter will be case sensitive. Default is false.

## **itemClick**  <br/>
> [Output] Will be emitted when one suggestion is selected.

## **inputChange**  <br/>
> [Output] Will be emitted when keyword input changes. It won't be emitted when [`oneTimeBinding`](#onetimebinding--) is true.
