# ruby-js

If you're familiar with ruby, occasionally when coding in other languages something feels missing. My goal with this is to implement every method of Array and go from there!

Some example code:

    var records = [ { name: 'AJ', age: 19 }, { name: 'Eli', age: 17 } ];
    var names = records.collect('name').map('reverse');
    //= [ "JA", "ilE" ]

    var evens = [], odds = [];
    [1, 2, 3, 4, 5, 6].each_slice(2, function(left, right) {
	    evens.push(right); odds.push(left);
    });
		[evens, odds]
		//= [ [ 2, 4, 6 ], [ 1, 3, 5 ] ]
		
		function below(min) {
			return function(x) { return x < min };
		}
		[25, 4, 8, 23, 19].reject( below(20) );
		//= [ 25, 23 ]

Docs will be a long time coming... however a checklist:

Object
- class

Enumerator:
- ::new
- each
- next
- next_values
- peek
- peek_values
- with_index & each\_with\_index
- with_object & each\_with\_object
- to_a

Array:
- ::new
- at
- clear
- compact
- concat
- drop
- drop_while
- each _(can't break to return nil)_
- each_index

*new* in Array:
- append (think of it as concat!)

Enumerable:
- all
- any
- count
- cycle
- detect & find
- each_cons
- each_slice
- each_with\_index
- each_with\_object
- flat_map & collect\_concat
- find_index
- first
- select & find_all
- group_by
- include & member
- inject _(not reduce)_
- map & collect
- none
- one
- partition
- reject
- reverse_each
- take



