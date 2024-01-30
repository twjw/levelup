package main

import "fmt"

type IPAddr [4]byte

// TODO: Add a "String() string" method to IPAddr.

func (i IPAddr) String() string {
	var result = ""
	for j, el := range i {
		if j > 0 {
			result += ", " + fmt.Sprintf("%d", el)
			continue
		}

		result += fmt.Sprintf("%d", el)
	}
	fmt.Println(result)
	return result
}

func main() {
	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\n", name, ip)
	}
}
