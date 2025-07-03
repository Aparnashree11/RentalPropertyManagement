package com.example.demo.service;

import com.example.demo.model.Tenant;
import com.example.demo.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    public Tenant saveTenant(Tenant tenant) {
        return tenantRepository.save(tenant);
    }

    public void deleteTenant(Long id) {
        tenantRepository.deleteById(id);
    }
}
