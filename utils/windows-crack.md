# Windows crack with kms auto

Note that this works only with standard windows terminal not with `Powershell`. Also terminal must be runned by administrator.

1. Here need to provide windows activation key e.g. `W269N-WFGWX-YVC9B-4J6C9-T83GX`
```sh
slmgr/ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
```

2. Sets the Key Management Service (KMS) server for Windows activation to the specified server address 
```sh
slmgr /skms kms.digiboy.ir
```

2. Runs activation
```sh
slmgr /ato
```
