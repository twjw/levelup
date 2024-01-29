package main

import (
	"fmt"
)

func main() {
	helloWorld()
	declareVariables()
	ifElse()
	forloop()
	operators()
	fmt.Println(split(17))
	deferFunc()
	pointFunc()
	structTest()
	slicetest()
	maptest()
}

type MyInt int

func (i MyInt) Abs() int {
	if i < 0 {
		return 0
	}
	return 1
}

func maptest() {
	i := MyInt(1)
	i.Abs()
	var m map[string]int

	if m == nil {
		m = map[string]int{
			"aaa": 123,
		}
	}

	el, ok := m["bbb"]

	fmt.Println(m, el, ok)
}

func slicetest() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)

	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)

	s2 := []int{2, 3, 5, 7, 11, 13}

	s2 = s2[1:4]
	fmt.Println(s2)

	s2 = s2[:2]
	fmt.Println(s2)

	s2 = s2[1:]
	fmt.Println(s2)

	s3 := []int{2, 3, 5, 7, 11, 13}
	s3 = append(s3, 1, 2, 3)
	printSlice(s3)

	// Slice the slice to give it zero length.
	s3 = s3[:0]
	printSlice(s3)

	// Extend its length.
	s3 = s3[:4]
	printSlice(s3)

	// Drop its first two values.
	s3 = s3[2:]
	printSlice(s3)

	aa := make([]int, 5) // len(a)=5
	fmt.Println(aa, len(aa))
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

type Vertex struct {
	X int
	Y int
}

func structTest() {
	var v = Vertex{1, 2}
	//var v2 = Vertex{X: 1, Y: 2}
	//var v3 = Vertex{}
	//var p2 = &Vertex{1, 2}
	v.X = 213

	var p = &v
	p.X = 444
	fmt.Println(v.X, p.X)
}

func pointFunc() {
	i, j := 42, 2701

	p := &i         // point to i
	fmt.Println(*p) // read i through the pointer
	*p = 21         // set i through the pointer
	fmt.Println(i)  // see the new value of i

	p = &j         // point to j
	*p = *p / 37   // divide j through the pointer
	fmt.Println(j) // see the new value of j
}

func deferFunc() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(999, i)
	}

	fmt.Println("done")
}

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func operators() {
	a := 94
	fmt.Println(a)
	b := &a
	fmt.Println(b, *b)
	*b = 64
	fmt.Println(a, *b)
}

func forloop() {
	i := 1
	for i <= 3 {
		fmt.Println(i)
		i++
	}

	for i := 0; i < 3; i++ {
		fmt.Println(i)
	}

	var rv = []string{"AAA", "BBB", "CCC"}

	for i2, j := range rv {
		fmt.Println(i2, j)
	}
}

func ifElse() {
	var n = 7

	if n%2 == 0 {
		fmt.Printf("%v is even", n)
	} else {
		fmt.Printf("%v is even", n)
	}
}

// 定義變量
func declareVariables() {
	var a string = "initial"
	fmt.Println(a)

	var b, c int = 1, 2
	fmt.Println(b, c)

	var d = true
	fmt.Println(d)

	e := "apple"
	fmt.Println(e)
}

// hello world
func helloWorld() {
	fmt.Println("hello world")
}
