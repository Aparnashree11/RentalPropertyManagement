package com.example.demo.controller;

import com.example.demo.model.Tenant;
import com.example.demo.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tenant")
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @GetMapping
    public List<Tenant> getTenants() {
        return tenantService.getAllTenants();
    }

    @PostMapping
    public Tenant addTenant(@RequestBody Tenant tenant) {
        return tenantService.saveTenant(tenant);
    }

    @DeleteMapping("/{id}")
    public void deleteTenant(@PathVariable Long id) {
        tenantService.deleteTenant(id);
    }
}
